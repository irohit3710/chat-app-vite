import { successThoughts } from "./Thoughts";

export function generateMeetingId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let result = '';

  // Generate the initial 12-character ID
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters[randomIndex];
  }

  // Convert the result to an array to shuffle it
  let idArray = result.split('');

  // Shuffle the array using the Fisher-Yates (Knuth) shuffle algorithm
  for (let i = idArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idArray[i], idArray[j]] = [idArray[j], idArray[i]];
  }

  // Join the shuffled array back into a string
  return idArray.join('');
}


export function getRandomThought (){
  if(successThoughts.length==0){
    return;
  }
  
  const n = successThoughts.length;
  const index = Math.floor(Math.random()*n);

  return successThoughts[index];
}