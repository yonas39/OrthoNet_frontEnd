<template>
  <div>
    <h1>Create a New Quiz</h1>
    <form @submit.prevent="createQuiz">
      <div>
        <label for="title">Quiz Title:</label>
        <input id="title" v-model="quiz.title" type="text" required />
      </div>
      <div v-for="(question, index) in quiz.questions" :key="index">
        <h3>Question {{ index + 1 }}</h3>
        <label for="'question-' + index">Question Text:</label>
        <input :id="'question-' + index" v-model="question.questionText" type="text" required />
        <div v-for="(option, idx) in question.options" :key="'option-' + idx">
          <label :for="'option-' + index + '-' + idx">Option {{ "ABCD"[idx] }}:</label>
          <input :id="'option-' + index + '-' + idx" v-model="option" type="text" required />
        </div>
        <label for="'correct-' + index">Correct Answer:</label>
        <select :id="'correct-' + index" v-model="question.correctAnswer" required>
          <option disabled value="">Please select one</option>
          <option v-for="letter in ['A', 'B', 'C', 'D']" :key="letter">{{ letter }}</option>
        </select>
      </div>
      <button type="button" @click="addQuestion">Add Question</button>
      <button type="submit">Create Quiz</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quiz: {
        title: "",
        questions: [],
      },
    };
  },
  methods: {
    addQuestion() {
      this.quiz.questions.push({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
    },
    async createQuiz() {
      const response = await fetch("/api/quizzes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.quiz),
      });
      if (response.ok) {
        this.$router.push("/quizzes");
      } else {
        console.error("Failed to create quiz");
      }
    },
  },
};
</script>
