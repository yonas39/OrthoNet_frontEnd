<!-- <template>
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
</script> -->

<template>
  <div>
    <h1>Create a New Quiz</h1>
    <form @submit.prevent="createQuiz">
      <div>
        <label for="title">Quiz Title:</label>
        <input id="title" v-model="quiz.title" type="text" required />
      </div>

      <div v-for="(question, index) in quiz.questions" :key="index" class="question-block">
        <h3>Question {{ index + 1 }}</h3>

        <label :for="'question-' + index">Question Text:</label>
        <input :id="'question-' + index" v-model="question.question.text" type="text" required />

        <div v-for="(option, idx) in question.options" :key="idx">
          <label :for="'option-' + index + '-' + idx">Option {{ "ABCD"[idx] }}:</label>
          <input :id="'option-' + index + '-' + idx" v-model="question.options[idx]" type="text" required />
        </div>

        <label :for="'correct-' + index">Correct Answer:</label>
        <select :id="'correct-' + index" v-model="question.correctAnswer" required>
          <option disabled value="">Please select one</option>
          <option v-for="(option, idx) in question.options" :key="idx" :value="option">
            {{ "ABCD"[idx] }}
          </option>
        </select>

        <label :for="'tags-' + index">Tags (comma separated):</label>
        <input :id="'tags-' + index" v-model="question.tags" type="text" placeholder="e.g., old_testament, prophets" />

        <label :for="'difficulty-' + index">Difficulty:</label>
        <select :id="'difficulty-' + index" v-model="question.difficulty" required>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <label :for="'regions-' + index">Regions (comma separated):</label>
        <input :id="'regions-' + index" v-model="question.regions" type="text" placeholder="e.g., global, africa" />

        <label :for="'isNiche-' + index">Is Niche Question?</label>
        <input type="checkbox" :id="'isNiche-' + index" v-model="question.isNiche" />
      </div>

      <button type="button" @click="addQuestion">Add Question</button>
      <button type="submit">Create Quiz</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateQuiz",
  data() {
    return {
      quiz: {
        title: "",
        questions: [],
      },
      creatorId: "64b7f2a3e7c5d43b33e12345", // Replace with actual user ID if dynamic
    };
  },
  methods: {
    addQuestion() {
      this.quiz.questions.push({
        question: { text: "" },
        options: ["", "", "", ""],
        correctAnswer: "",
        tags: "",
        difficulty: "easy",
        regions: "",
        isNiche: false,
      });
    },
    async createQuiz() {
      try {
        const response = await fetch("/api/quizzes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: this.quiz.title,
            questions: this.quiz.questions.map((q, index) => ({
              questionID: index + 1,
              question: { text: q.question.text },
              options: q.options,
              correctAnswer: q.correctAnswer,
              tags: q.tags ? q.tags.split(",").map((tag) => tag.trim()) : [],
              difficulty: q.difficulty,
              regions: q.regions ? q.regions.split(",").map((region) => region.trim()) : [],
              isNiche: q.isNiche,
            })),
            creator: this.creatorId,
          }),
        });

        if (response.ok) {
          this.$router.push("/quizzes");
        } else {
          const errorData = await response.json();
          console.error("Failed to create quiz:", errorData.msg);
          alert(`Error: ${errorData.msg}`);
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("An error occurred while creating the quiz.");
      }
    },
  },
};
</script>

<style scoped>
.question-block {
  margin-bottom: 20px;
}
</style>

<!--
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
        <label :for="'question-' + index">Question Text:</label>
        <input :id="'question-' + index" v-model="question.questionText" type="text" required />

        <div v-for="(option, idx) in question.options" :key="idx">
          <label :for="'option-' + index + '-' + idx">Option {{ "ABCD"[idx] }}:</label>
          <input :id="'option-' + index + '-' + idx" v-model="question.options[idx]" type="text" required />
        </div>

        <label :for="'correct-' + index">Correct Answer:</label>
        <select :id="'correct-' + index" v-model="question.correctAnswer" required>
          <option disabled value="">Please select one</option>
          <option v-for="(option, idx) in question.options" :key="idx" :value="'ABCD'[idx]">
            {{ "ABCD"[idx] }}
          </option>
        </select>
      </div>

      <button type="button" @click="addQuestion">Add Question</button>
      <button type="submit">Create Quiz</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateQuiz",
  data() {
    return {
      quiz: {
        title: "",
        questions: [],
      },
      creatorId: "64b7f2a3e7c5d43b33e12345", // Replace with actual user ID if dynamic
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
      try {
        const response = await fetch("/api/quizzes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: this.quiz.title,
            questions: this.quiz.questions.map((q, index) => ({
              questionID: index + 1,
              questionText: q.questionText,
              options: q.options,
              correctAnswer: q.correctAnswer,
            })),
            creator: this.creatorId,
          }),
        });

        if (response.ok) {
          this.$router.push("/quizzes");
        } else {
          const errorData = await response.json();
          console.error("Failed to create quiz:", errorData.msg);
          alert(`Error: ${errorData.msg}`);
        }
      } catch (error) {
        console.error("Network error:", error);
        alert("An error occurred while creating the quiz.");
      }
    },
  },
};
</script> -->
