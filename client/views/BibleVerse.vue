<script setup lang="ts">
import Urls from "@/components/Quiz/Urls.json";
import { ref } from "vue";

const quizTitle = ref("Bible Verse");
const Quotes = ref({});
const singeVerse = ref("");

function getRandomUrl() {
  const randomIndex = Math.floor(Math.random() * Urls.bible_verses.length);
  return Urls.bible_verses[randomIndex];
}

async function getBibleVerse() {
  try {
    const url = getRandomUrl();
    // console.log("URL: ", url);
    const response = await fetch(url);
    const data = await response.json();
    // console.log("Verse: ", data); // Log the verse content
    Quotes.value = data; // Set the verse as a question
    singeVerse.value = data.verses[0].text;
  } catch (error) {
    console.error("Error fetching verse: ", error);
  }
}
</script>

<template>
  <div class="container">
    <h1>{{ quizTitle }}</h1>
    <!-- <p class="description">Test your knowledge of the Bible with this quiz!</p> -->
    <p class="verse">{{ singeVerse }}</p>
    <button @click="getBibleVerse" class="generate-button">Generate New Verse</button>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #f8b500, #fceabb);
  padding: 20px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: auto;
  background: rgba(255, 255, 255, 0.8);
}

h1 {
  font-family: "Roboto", sans-serif;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.description {
  font-family: "Roboto", sans-serif;
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 20px;
}

.verse {
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  color: #444;
  margin-bottom: 30px;
  padding: 0 20px;
  border-left: 4px solid #f8b500;
  background: #fff;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.generate-button {
  width: 100%;
  padding: 10px;
  background-color: #ff9898;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  /* padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
}

.generate-button:hover {
  background-color: #fc8080;
  transform: translateY(-2px);
}

@media (max-width: 600px) {
  h1 {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }

  .verse {
    font-size: 1.2rem;
  }

  .generate-button {
    font-size: 0.9rem;
    padding: 8px 16px;
  }
}
</style>
