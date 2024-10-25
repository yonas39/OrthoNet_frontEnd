import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError } from "./errors";

interface PilgrimageTourDoc extends BaseDoc {
  title: string;
  description: string;
  availableDates: Date[];
  location: string;
  participants: ObjectId[];
}

interface UserTourParticipationDoc extends BaseDoc {
  tourId: ObjectId;
  user: ObjectId;
}

/**
 * concept: PilgrimageTouring
 * Purpose: Offer users immersive virtual tours of significant Orthodox Christian sites.
 */
export default class PilgrimageTouringConcept {
  public readonly tours: DocCollection<PilgrimageTourDoc>;
  public readonly userParticipation: DocCollection<UserTourParticipationDoc>;

  /**
   * Make an instance of PilgrimageTouring.
   */
  constructor(collectionName: string) {
    this.tours = new DocCollection<PilgrimageTourDoc>(collectionName + "_tours");
    this.userParticipation = new DocCollection<UserTourParticipationDoc>(collectionName + "_userParticipation");
  }

  // Method to create a pilgrimage tour
  async createPilgrimageTour(title: string, description: string, location: string) {
    // Check if a tour with the same title and location already exists
    const existingTour = await this.tours.readOne({ title, location });
    if (existingTour) {
      throw new TourAlreadyExist(existingTour._id);
    }
    const tourId = await this.tours.createOne({
      title,
      description,
      location,
      participants: [],
    });

    return { msg: "Pilgrimage tour successfully created!", tour: await this.tours.readOne({ _id: tourId }) };
  }

  // Start a tour
  async startTour(user: ObjectId, tourID: ObjectId) {
    await this.assertTourExists(tourID);
    const existingParticipation = await this.userParticipation.readOne({ user, tourId: tourID });

    if (existingParticipation) {
      throw new UserAlreadyInTourError(user, tourID);
    }

    // Update both userParticipation and participants list in a single operation
    await Promise.all([this.userParticipation.createOne({ user, tourId: tourID }), this.tours.collection.updateOne({ _id: tourID }, { $push: { participants: user } })]);

    return { msg: "Tour started!", tour: await this.tours.readOne({ _id: tourID }) };
  }

  // Join a group tour
  async joinGroupT(user: ObjectId, tourID: ObjectId) {
    await this.assertTourExists(tourID);
    const existingParticipation = await this.userParticipation.readOne({ user, tourId: tourID });

    if (existingParticipation) {
      throw new UserAlreadyInGroupError(user, tourID);
    }

    // Update both userParticipation and participants in a single operation
    await Promise.all([this.userParticipation.createOne({ user, tourId: tourID }), this.tours.collection.updateOne({ _id: tourID }, { $push: { participants: user } })]);

    return { msg: "Joined group tour!", tour: await this.tours.readOne({ _id: tourID }) };
  }

  // View tour details
  async viewTourDetails(tourID: ObjectId) {
    await this.assertTourExists(tourID);
    const tourDetails = await this.tours.readOne({ _id: tourID });
    return tourDetails;
  }

  // Leave a tour
  async leaveTour(user: ObjectId, tourID: ObjectId) {
    await this.assertTourExists(tourID);

    const tour = await this.tours.readOne({ _id: tourID });

    // Ensure the user is a participant
    if (!tour) {
      throw new NotAllowedError(`Tour ${tourID} does not exist.`);
    }
    const isParticipant = tour.participants.some((participantId) => participantId.equals(user));
    if (!isParticipant) {
      throw new NotAllowedError(`User ${user} is not a participant in the tour ${tourID}`);
    }

    // Remove user from both participants and userParticipation collection
    await Promise.all([this.tours.collection.updateOne({ _id: tourID }, { $pull: { participants: user } }), this.userParticipation.collection.deleteOne({ user, tourId: tourID })]);

    return { msg: "Tour left successfully!", tour: await this.tours.readOne({ _id: tourID }) };
  }

  // Helper Methods
  private async assertTourExists(_id: ObjectId) {
    const tour = await this.tours.readOne({ _id });
    if (!tour) {
      throw new TourNotFoundError(_id);
    }
  }

  private async assertUserParticipation(user: ObjectId, tourID: ObjectId) {
    const participation = await this.userParticipation.readOne({ user, tourId: tourID });
    if (!participation) {
      throw new NotAllowedError(`User ${user} is not participating in the tour ${tourID}`);
    }
  }
}

// Custom Error Classes

export class PilgrimageTourError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PilgrimageTourError";
  }
}

export class TourNotFoundError extends PilgrimageTourError {
  constructor(public readonly tourId: ObjectId) {
    super(`Tour ${tourId} does not exist!`);
  }
}

export class TourAlreadyExist extends PilgrimageTourError {
  constructor(public readonly tourId: ObjectId) {
    super(`Tour ${tourId} already exists!`);
  }
}

export class UserAlreadyInTourError extends PilgrimageTourError {
  constructor(
    public readonly user: ObjectId,
    public readonly tourId: ObjectId,
  ) {
    super(`User ${user} is already a participant in tour ${tourId}`);
  }
}

export class UserAlreadyInGroupError extends PilgrimageTourError {
  constructor(
    public readonly user: ObjectId,
    public readonly tourId: ObjectId,
  ) {
    super(`User ${user} is already a participant in Group ${tourId}`);
  }
}
