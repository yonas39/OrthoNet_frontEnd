<script setup lang="ts">
import { computed, ref } from "vue";
import questionData from "./Questions.json";

const quizTitle = ref(questionData.title);
const questions = ref(questionData.questions);
const selectedAnswers = ref<string[]>(Array(questions.value.length).fill(""));
const showAnswers = ref(false);
const quizSubmitted = ref(false);
const currentBatch = ref(1);
const questionsPerBatch = 7;
const totalBatches = computed(() => Math.ceil(questions.value.length / questionsPerBatch));

// Get the questions for the current batch
const batchQuestions = computed(() => {
  const start = (currentBatch.value - 1) * questionsPerBatch;
  const end = start + questionsPerBatch;
  return questions.value.slice(start, end);
});

// Ensure all current batch questions are answered
const isCurrentBatchComplete = computed(() => batchQuestions.value.every((question, index) => selectedAnswers.value[(currentBatch.value - 1) * questionsPerBatch + index] !== ""));

// Submit current batch and prompt for more questions
const submitQuiz = () => {
  if (isCurrentBatchComplete.value) {
    quizSubmitted.value = true;
    setTimeout(() => {
      askForMoreQuestions();
    }, 100); // Slight delay to avoid UI confusion
  } else {
    alert("Please answer all questions before submitting.");
  }
};

// Ask if the user wants to continue with more questions
const askForMoreQuestions = () => {
  const wantsMore = confirm(`You completed set ${currentBatch.value} of ${totalBatches.value}. Would you like to continue with more questions?`);
  if (wantsMore && currentBatch.value < totalBatches.value) {
    currentBatch.value++;
    quizSubmitted.value = false;
  } else {
    alert("Thank you for taking the quiz!");
  }
};

// Toggle answer visibility (only after submission)
const toggleAnswers = () => {
  if (quizSubmitted.value) {
    showAnswers.value = !showAnswers.value;
  } else {
    alert("Submit the quiz to see the answers.");
  }
};

// Calculate score for the completed questions
const score = computed(() => {
  let correctCount = 0;
  questions.value.forEach((question, index) => {
    if (selectedAnswers.value[index] === question.correctAnswer) {
      correctCount++;
    }
  });
  return correctCount;
});
</script>

<template>
  <div>
    <h1>{{ quizTitle }}</h1>
    <form @submit.prevent="submitQuiz">
      <div v-for="(question, index) in batchQuestions" :key="index" class="question">
        <p>{{ question.question.text }}</p>
        <ul role="radiogroup" :aria-labelledby="'question-' + index">
          <li v-for="option in question.options" :key="option" class="option">
            <label>
              <input
                type="radio"
                :name="'question-' + ((currentBatch - 1) * questionsPerBatch + index)"
                :value="option"
                v-model="selectedAnswers[(currentBatch - 1) * questionsPerBatch + index]"
                :disabled="quizSubmitted"
                required
              />
              {{ option }}
            </label>
          </li>
        </ul>
        <p v-if="showAnswers && quizSubmitted">Correct Answer: {{ question.correctAnswer }}</p>
      </div>

      <button type="submit" :disabled="quizSubmitted">Submit Quiz</button>

      <button type="button" @click="toggleAnswers">{{ showAnswers ? "Hide" : "Show" }} Answers</button>
    </form>

    <div v-if="quizSubmitted">
      <h2>Your Score: {{ score }} / {{ currentBatch * questionsPerBatch }}</h2>
    </div>
  </div>
</template>

<style scoped>
.question {
  margin-bottom: 20px;
}

button {
  margin-top: 20px;
}

.option {
  margin: 5px 0;
}
</style>
