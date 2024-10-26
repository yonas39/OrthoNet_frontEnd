<!-- <template>
  <div v-if="quiz">
    <h1>{{ quiz.title }}</h1>
    <form @submit.prevent="submitAnswers">
      <div v-for="(question, index) in quiz.questions" :key="index">
        <h3>{{ question.questionText }}</h3>
        <ul>
          <li v-for="(option, idx) in question.options" :key="idx">
            <label>
              <input type="radio" :name="'question-' + index" :value="'ABCD'[idx]" v-model="answers[index]" />
              {{ option }}
            </label>
          </li>
        </ul>
      </div>
      <button type="submit">Submit Answers</button>
    </form>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  name: "TakeQuiz",
  data() {
    return {
      quiz: null,
      answers: [],
    };
  },
  async created() {
    const response = await fetch("/api/quizzes/" + this.$route.params.quizId);
    if (response.ok) {
      this.quiz = await response.json();
      this.answers = new Array(this.quiz.questions.length).fill("");
    } else {
      console.error("Failed to load quiz");
    }
  },
  methods: {
    async submitAnswers() {
      const results = this.quiz.questions.map((question, index) => {
        return fetch(`/api/quizzes/${this.$route.params.quizId}/answer/${question.questionID}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ selectedAnswer: this.answers[index] }),
        });
      });

      Promise.all(results)
        .then((responses) => {
          if (responses.every((res) => res.ok)) {
            this.$router.push("/quizzes/" + this.$route.params.quizId + "/results");
          } else {
            console.error("Some answers failed to submit");
          }
        })
        .catch((error) => {
          console.error("Failed to submit answers:", error);
        });
    },
  },
};
</script> -->

<template>
  <div v-if="quiz">
    <h1>{{ quiz.title }}</h1>
    <form @submit.prevent="submitAnswers">
      <div v-for="(question, index) in quiz.questions" :key="question.questionID">
        <h3>{{ question.questionText }}</h3>
        <ul>
          <li v-for="(option, idx) in question.options" :key="idx">
            <label>
              <input type="radio" :name="'question-' + index" :value="'ABCD'[idx]" v-model="answers[index]" required />
              {{ option }}
            </label>
          </li>
        </ul>
      </div>
      <button type="submit">Submit Answers</button>
    </form>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  name: "TakeQuiz",
  data() {
    return {
      quiz: null,
      answers: [], // Stores selected answers by the user.
    };
  },
  async created() {
    try {
      const response = await fetch(`/api/quizzes/${this.$route.params.quizId}`);
      if (!response.ok) throw new Error("Failed to load quiz");

      this.quiz = await response.json();
      this.answers = new Array(this.quiz.questions.length).fill(""); // Initialize answers array
    } catch (error) {
      console.error(error.message);
    }
  },
  methods: {
    async submitAnswers() {
      try {
        const promises = this.quiz.questions.map((question, index) =>
          fetch(`/api/quizzes/${this.$route.params.quizId}/answer/${question.questionID}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ selectedAnswer: this.answers[index] }),
          }),
        );

        const responses = await Promise.all(promises);

        if (responses.every((res) => res.ok)) {
          this.$router.push(`/quizzes/${this.$route.params.quizId}/results`);
        } else {
          console.error("Some answers failed to submit");
          alert("Some answers failed to submit. Please try again.");
        }
      } catch (error) {
        console.error("Failed to submit answers:", error);
        alert("An error occurred while submitting answers. Please try again.");
      }
    },
  },
};
</script>
