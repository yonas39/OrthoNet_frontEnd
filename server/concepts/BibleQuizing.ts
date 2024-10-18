import { ObjectId } from "mongodb";
import DocCollection, { BaseDoc } from "../framework/doc";
import { NotAllowedError, NotFoundError } from "./errors";

interface QuizDoc extends BaseDoc {
  title: string;
  questions: QuestionDoc[];
  creator: ObjectId;
}

interface QuestionDoc {
  questionID: number;
  questionText: string;
  correctAnswer: string;
}

interface UserQuizRecordDoc extends BaseDoc {
  user: ObjectId;
  quizID: ObjectId;
  score: number;
  progress: number;
}

/**
 * concept: BibleQuiz [User]
 */
export default class BibleQuizConcept {
  public readonly quizzes: DocCollection<QuizDoc>;
  public readonly userQuizRecords: DocCollection<UserQuizRecordDoc>;

  /**
   * Make an instance of BibleQuiz.
   */
  constructor(collectionName: string) {
    this.quizzes = new DocCollection<QuizDoc>(collectionName + "_quizzes");
    this.userQuizRecords = new DocCollection<UserQuizRecordDoc>(collectionName + "_userQuizRecords");
  }

  // Create a new quiz
  async createQuiz(title: string, questions: QuestionDoc[], creator: ObjectId) {
    const quizExists = await this.quizzes.readOne({ title, questions, creator });
    if (quizExists) {
      throw new QuizAlreadyExistsError(title);
    }
    const quizID = await this.quizzes.createOne({ title, questions, creator });
    return { msg: "Quiz successfully created!", quiz: await this.quizzes.readOne({ _id: quizID }) };
  }

  // Get all quizzes
  async getQuizzes() {
    return await this.quizzes.readMany({});
  }

  // Get a specific quiz
  async getQuiz(_id: ObjectId) {
    await this.assertQuizExists(_id);
    return await this.quizzes.readOne({ _id });
  }

  // Start a quiz for a user
  async startQuiz(user: ObjectId, quizID: ObjectId) {
    await this.assertQuizExists(quizID);
    const existingRecord = await this.userQuizRecords.readOne({ user, quizID });
    if (existingRecord) {
      throw new QuizAlreadyStartedError(user, quizID);
    }
    await this.userQuizRecords.createOne({ user, quizID, score: 0, progress: 0 });
    return { msg: "Quiz started!" };
  }

  // Answer a question
  async answerQuestion(user: ObjectId, quizID: ObjectId, questionID: number, selectedAnswer: string) {
    const quiz = await this.getQuiz(quizID);
    if (!quiz) {
      throw new QuizNotFoundError(quizID);
    }

    // Ensure question exists in the quiz
    const question = quiz.questions.find((q) => q.questionID === questionID);
    if (!question) {
      throw new QuestionNotFoundError(questionID, quizID);
    }

    // Check if the user has started the quiz
    const userRecord = await this.userQuizRecords.readOne({ user, quizID });
    if (!userRecord) {
      throw new QuizNotStartedError(user, quizID);
    }

    // Determine if the answer is correct
    const correct = question.correctAnswer.toLowerCase() === selectedAnswer.toLowerCase();
    const score = correct ? userRecord.score + 1 : userRecord.score;

    // Calculate new progress
    const progress = ((userRecord.progress + 1) / quiz.questions.length) * 100;

    // Update user's score and progress
    await this.userQuizRecords.partialUpdateOne({ user, quizID }, { score, progress });

    return { msg: "Answered question!", correct, progress, score };
  }

  // Get leaderboard for a quiz
  async getQuizLeaderboard(quizID: ObjectId) {
    await this.assertQuizExists(quizID);
    const records = await this.userQuizRecords.readMany({ quizID });

    // Sort by score, then by progress in case of a tie
    const leaderboard = records.sort((a, b) => b.score - a.score || b.progress - a.progress).map((record) => ({ user: record.user, score: record.score, progress: record.progress }));

    return { msg: "Leaderboard fetched!", leaderboard };
  }

  // Get the progress of a user on a quiz
  async getPlayerProgress(quizID: ObjectId, user: ObjectId) {
    const userRecord = await this.userQuizRecords.readOne({ user, quizID });
    if (!userRecord) {
      throw new QuizNotStartedError(user, quizID);
    }

    const quiz = await this.getQuiz(quizID);
    if (!quiz) {
      throw new QuizNotFoundError(quizID);
    }

    return {
      msg: "Player progress fetched!",
      progress: userRecord.progress,
      score: userRecord.score,
      totalQuestions: quiz.questions.length,
    };
  }

  // Helper method to check if a quiz exists
  private async assertQuizExists(_id: ObjectId) {
    const quiz = await this.quizzes.readOne({ _id });
    if (!quiz) {
      throw new QuizNotFoundError(_id);
    }
  }
}

// Custom Error Classes

export class QuizNotFoundError extends NotFoundError {
  constructor(public readonly quizID: ObjectId) {
    super(`Quiz ${quizID} does not exist!`);
  }
}

export class QuestionNotFoundError extends NotFoundError {
  constructor(
    public readonly questionID: number,
    public readonly quizID: ObjectId,
  ) {
    super(`Question ${questionID} not found in quiz ${quizID}.`);
  }
}

export class QuizAlreadyStartedError extends NotAllowedError {
  constructor(
    public readonly user: ObjectId,
    public readonly quizID: ObjectId,
  ) {
    super(`User ${user} has already started quiz ${quizID}.`);
  }
}

export class QuizNotStartedError extends NotAllowedError {
  constructor(
    public readonly user: ObjectId,
    public readonly quizID: ObjectId,
  ) {
    super(`User ${user} has not started quiz ${quizID}.`);
  }
}
export class QuizAlreadyExistsError extends NotAllowedError {
  constructor(public readonly title: string) {
    super(`Quiz ${title} already exists!`);
  }
}

// import { ObjectId } from "mongodb";
// import DocCollection, { BaseDoc } from "../framework/doc";
// import { NotAllowedError, NotFoundError } from "./errors";

// interface QuizDoc extends BaseDoc {
//   title: string;
//   questions: QuestionDoc[];
//   creator: ObjectId;
// }

// interface QuestionDoc {
//   questionID: number;
//   questionText: string;
//   correctAnswer: string;
// }

// interface UserQuizRecordDoc extends BaseDoc {
//   user: ObjectId;
//   quizID: ObjectId;
//   score: number;
//   progress: number;
// }

// /**
//  * concept: BibleQuiz [User]
//  */
// export default class BibleQuizConcept {
//   public readonly quizzes: DocCollection<QuizDoc>;
//   public readonly userQuizRecords: DocCollection<UserQuizRecordDoc>;

//   /**
//    * Make an instance of BibleQuiz.
//    */
//   constructor(collectionName: string) {
//     this.quizzes = new DocCollection<QuizDoc>(collectionName + "_quizzes");
//     this.userQuizRecords = new DocCollection<UserQuizRecordDoc>(collectionName + "_userQuizRecords");
//   }

//   async createQuiz(title: string, questions: QuestionDoc[], creator: ObjectId) {
//     const quizID = await this.quizzes.createOne({ title, questions, creator });
//     return { msg: "Quiz successfully created!", quiz: await this.quizzes.readOne({ _id: quizID }) };
//   }

//   async getQuizzes() {
//     return await this.quizzes.readMany({});
//   }

//   async getQuiz(_id: ObjectId) {
//     await this.assertQuizExists(_id);
//     return await this.quizzes.readOne({ _id });
//   }

//   async startQuiz(user: ObjectId, quizID: ObjectId) {
//     await this.assertQuizExists(quizID);
//     const existingRecord = await this.userQuizRecords.readOne({ user, quizID });
//     if (existingRecord) {
//       throw new NotAllowedError(`User ${user} has already started this quiz.`);
//     }
//     await this.userQuizRecords.createOne({ user, quizID, score: 0, progress: 0 });
//     return { msg: "Quiz started!" };
//   }

//   async answerQuestion(user: ObjectId, quizID: ObjectId, questionID: number, selectedAnswer: string) {
//     const quiz = await this.getQuiz(quizID);
//     if (!quiz) {
//       throw new NotFoundError(`Quiz ${quizID} not found`);
//     }
//     const question = quiz.questions.find((q) => q.questionID === questionID);
//     if (!question) {
//       throw new NotFoundError(`Question ${questionID} not found in quiz ${quizID}`);
//     }

//     const correct = question.correctAnswer.toLowerCase() === selectedAnswer.toLowerCase();
//     const userRecord = await this.userQuizRecords.readOne({ user, quizID });
//     if (!userRecord) {
//       throw new NotAllowedError(`User ${user} has not started the quiz ${quizID}`);
//     }

//     const score = correct ? userRecord.score + 1 : userRecord.score;
//     const progress = ((userRecord.progress + 1) / quiz.questions.length) * 100;
//     await this.userQuizRecords.partialUpdateOne({ user, quizID }, { score, progress });

//     return { msg: "Answered question!", correct, progress, score };
//   }

//   async getQuizLeaderboard(quizID: ObjectId) {
//     await this.assertQuizExists(quizID);
//     const records = await this.userQuizRecords.readMany({ quizID });
//     const leaderboard = records.sort((a, b) => b.score - a.score).map((record) => ({ user: record.user, score: record.score }));
//     return { msg: "Leaderboard fetched!", leaderboard };
//   }

//   async getPlayerProgress(quizID: ObjectId, user: ObjectId) {
//     const userRecord = await this.userQuizRecords.readOne({ user, quizID });
//     if (!userRecord) {
//       throw new NotFoundError(`User ${user} has not started the quiz ${quizID}`);
//     }
//     const quiz = await this.getQuiz(quizID);
//     if (!quiz) {
//       throw new NotFoundError(`Quiz ${quizID} not found`);
//     }
//     return {
//       msg: "Player progress fetched!",
//       progress: userRecord.progress,
//       score: userRecord.score,
//       totalQuestions: quiz.questions.length,
//     };
//   }

//   // Helper Methods
//   private async assertQuizExists(_id: ObjectId) {
//     const quiz = await this.quizzes.readOne({ _id });
//     if (!quiz) {
//       throw new QuizNotFoundError(_id);
//     }
//   }
// }

// export class QuizNotFoundError extends NotFoundError {
//   constructor(public readonly quizID: ObjectId) {
//     super(`Quiz ${quizID} does not exist!`);
//   }
// }
