let currentIndex = 0;
let totalCards = 0;
let cardsData = [];
let originalUrl = ''; // Store the original URL

function updateNavButtons() {
 const leftBtn = document.getElementById("leftBtn");
 const rightBtn = document.getElementById("rightBtn");
 
 // Show/hide buttons based on current position
 if (totalCards <= 1) {
   leftBtn.style.display = 'none';
   rightBtn.style.display = 'none';
 } else {
   leftBtn.style.display = 'block';
   rightBtn.style.display = 'block';
   
   // Disable buttons at boundaries
   leftBtn.disabled = currentIndex === 0;
   rightBtn.disabled = currentIndex === totalCards - 1;
 }
}

function updateProgressBars() {
 const progressBars = document.querySelectorAll('.progress-bar');
 progressBars.forEach((bar, index) => {
   const progressFill = bar.querySelector('.progress-fill');
   if (index <= currentIndex) {
     // Completed and current cards - instantly set to 100%
     progressFill.style.transition = 'none';
     progressFill.style.width = '100%';
   } else {
     // Future cards - instantly set to 0%
     progressFill.style.transition = 'none';
     progressFill.style.width = '0%';
   }
 });
}

function getRandomBackgroundImage() {
 // Array of high-quality 9:16 background images
 const images = [
   'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=711&fit=crop&crop=center',
   'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=711&fit=crop&crop=center',
   'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=711&fit=crop&crop=center',
   'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=400&h=711&fit=crop&crop=center',
   'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=711&fit=crop&crop=center',
   'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=711&fit=crop&crop=center',
   'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=711&fit=crop&crop=center',
   'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=711&fit=crop&crop=center',
   'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=400&h=711&fit=crop&crop=center',
   'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=711&fit=crop&crop=center'
 ];
 
 return images[Math.floor(Math.random() * images.length)];
}

function showCurrentCard() {
 const cardDisplay = document.getElementById("cardDisplay");
 cardDisplay.innerHTML = '';
 
 if (cardsData.length > 0) {
   const card = document.createElement('div');
   card.className = 'card';
   
   // Set random background image
   const backgroundImage = getRandomBackgroundImage();
   card.style.backgroundImage = `url(${backgroundImage})`;
   card.style.backgroundSize = 'cover';
   card.style.backgroundPosition = 'center';
   card.style.backgroundRepeat = 'no-repeat';
   
   // Create overlay for better text readability
   const overlay = document.createElement('div');
   overlay.className = 'card-overlay';
   
   // Create progress bars container
   const progressContainer = document.createElement('div');
   progressContainer.className = 'story-progress';
   
   // Create progress bars
   for (let i = 0; i < totalCards; i++) {
     const progressBar = document.createElement('div');
     progressBar.className = 'progress-bar';
     progressBar.innerHTML = '<div class="progress-fill"></div>';
     progressContainer.appendChild(progressBar);
   }
   
   // Create content container
   const contentContainer = document.createElement('div');
   contentContainer.className = 'card-content';
   contentContainer.innerText = cardsData[currentIndex];
   
   // Add "Read More" button on the last card
   if (currentIndex === totalCards - 1) {
     const readMoreBtn = document.createElement('button');
     readMoreBtn.className = 'read-more-btn';
     readMoreBtn.innerHTML = '📖 Read Full Article';
     readMoreBtn.onclick = function() {
       window.open(originalUrl, '_blank');
     };
     contentContainer.appendChild(readMoreBtn);
     
     // Add social sharing buttons
     const socialContainer = document.createElement('div');
     socialContainer.className = 'social-share-container';
     
     const shareText = encodeURIComponent(`Check out this interesting story: ${cardsData[0].substring(0, 100)}...`);
     const shareUrl = encodeURIComponent(originalUrl);
     
     // X (Twitter) Share
     const xButton = document.createElement('a');
     xButton.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
     xButton.target = '_blank';
     xButton.className = 'social-btn x-btn';
     xButton.innerHTML = '𝕏';
     xButton.title = 'Share on X';
     
     // LinkedIn Share
     const linkedinButton = document.createElement('a');
     linkedinButton.href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
     linkedinButton.target = '_blank';
     linkedinButton.className = 'social-btn linkedin-btn';
     linkedinButton.innerHTML = 'in';
     linkedinButton.title = 'Share on LinkedIn';
     
     // Instagram (copy link - Instagram doesn't support direct URL sharing)
     const instagramButton = document.createElement('button');
     instagramButton.className = 'social-btn instagram-btn';
     instagramButton.innerHTML = '📷';
     instagramButton.title = 'Copy link for Instagram';
     instagramButton.onclick = function() {
       navigator.clipboard.writeText(originalUrl).then(() => {
         alert('Link copied! Paste it in your Instagram story or bio.');
       });
     };
     
     // Reddit Share
     const redditButton = document.createElement('a');
     redditButton.href = `https://reddit.com/submit?url=${shareUrl}&title=${shareText}`;
     redditButton.target = '_blank';
     redditButton.className = 'social-btn reddit-btn';
     redditButton.innerHTML = '🔴';
     redditButton.title = 'Share on Reddit';
     
     socialContainer.appendChild(xButton);
     socialContainer.appendChild(linkedinButton);
     socialContainer.appendChild(instagramButton);
     socialContainer.appendChild(redditButton);
     
     contentContainer.appendChild(socialContainer);
   }
   
   overlay.appendChild(progressContainer);
   overlay.appendChild(contentContainer);
   card.appendChild(overlay);
   cardDisplay.appendChild(card);
   
   // Update progress bars after DOM is ready
   setTimeout(updateProgressBars, 10);
 }
}

function navigatePrevious() {
 if (currentIndex > 0) {
   currentIndex--;
   showCurrentCard();
   updateNavButtons();
 }
}

function navigateNext() {
 if (currentIndex < totalCards - 1) {
   currentIndex++;
   showCurrentCard();
   updateNavButtons();
 }
}

function chunkTextIntoStoryCards(text) {
 // Clean any remaining unwanted text
 text = text.replace(/Card \d+\/\d+:/gi, '');
 text = text.replace(/Card \d+:/gi, '');
 text = text.replace(/\*\*/g, '');
 text = text.replace(/Here's a story summary[^:]*:/gi, '');
 text = text.trim();
 
 // Split into sentences
 const sentences = text.split(/[.!?]+/).map(s => s.trim()).filter(s => s.length > 0);
 
 const storyCards = [];
 let currentCard = "";
 
 for (let sentence of sentences) {
   // Add period if missing
   if (!sentence.match(/[.!?]$/)) {
     sentence = sentence + ".";
   }
   
   const words = sentence.split(' ').filter(w => w.length > 0);
   const currentWords = currentCard.split(' ').filter(w => w.length > 0).length;
   const totalWords = currentWords + words.length;
   
   // If current card + new sentence would be too long, start new card
   if (currentCard && totalWords > 18) {
     // Finish current card if it has at least 12 words
     if (currentWords >= 12) {
       storyCards.push(currentCard.trim());
       currentCard = sentence;
     } else {
       // Current card too short, add sentence anyway
       currentCard += " " + sentence;
     }
   } else if (!currentCard) {
     // First sentence for new card
     currentCard = sentence;
   } else {
     // Add to current card
     currentCard += " " + sentence;
   }
   
   // Don't break early, process all sentences
 }
 
 // Add the last card
 if (currentCard.trim()) {
   storyCards.push(currentCard.trim());
 }
 
 // If we have less than 8 cards, split longer ones
 while (storyCards.length < 8) {
   let splitMade = false;
   for (let i = 0; i < storyCards.length; i++) {
     const words = storyCards[i].split(' ').filter(w => w.length > 0);
     if (words.length > 25) {
       // Split this card into two
       const mid = Math.floor(words.length / 2);
       let firstHalf = words.slice(0, mid).join(' ');
       let secondHalf = words.slice(mid).join(' ');
       
       // Ensure proper punctuation
       if (!firstHalf.match(/[.!?]$/)) firstHalf += ".";
       if (!secondHalf.match(/[.!?]$/)) secondHalf += ".";
       
       // Replace the original card with two new cards
       storyCards.splice(i, 1, firstHalf, secondHalf);
       splitMade = true;
       break;
     }
   }
   
   // If no splits were made and we still need more cards, 
   // split the longest remaining card
   if (!splitMade) {
     let longestIndex = 0;
     let longestLength = 0;
     
     for (let i = 0; i < storyCards.length; i++) {
       const wordCount = storyCards[i].split(' ').filter(w => w.length > 0).length;
       if (wordCount > longestLength) {
         longestLength = wordCount;
         longestIndex = i;
       }
     }
     
     if (longestLength > 15) {
       const words = storyCards[longestIndex].split(' ').filter(w => w.length > 0);
       const mid = Math.floor(words.length / 2);
       let firstHalf = words.slice(0, mid).join(' ');
       let secondHalf = words.slice(mid).join(' ');
       
       // Ensure proper punctuation
       if (!firstHalf.match(/[.!?]$/)) firstHalf += ".";
       if (!secondHalf.match(/[.!?]$/)) secondHalf += ".";
       
       storyCards.splice(longestIndex, 1, firstHalf, secondHalf);
     } else {
       // If no card is long enough to split, break the loop
       break;
     }
   }
 }
 
 // Ensure we don't exceed 10 cards
 if (storyCards.length > 10) {
   return storyCards.slice(0, 10);
 }
 
 // If we still have less than 8 cards after all attempts, 
 // add more by further splitting
 while (storyCards.length < 8 && storyCards.length > 0) {
   const lastCard = storyCards[storyCards.length - 1];
   const words = lastCard.split(' ').filter(w => w.length > 0);
   
   if (words.length >= 12) {
     const mid = Math.floor(words.length / 2);
     let firstHalf = words.slice(0, mid).join(' ');
     let secondHalf = words.slice(mid).join(' ');
     
     if (!firstHalf.match(/[.!?]$/)) firstHalf += ".";
     if (!secondHalf.match(/[.!?]$/)) secondHalf += ".";
     
     storyCards.splice(-1, 1, firstHalf, secondHalf);
   } else {
     break;
   }
 }
 
 return storyCards;
}

async function fetchStory() {
 const url = document.getElementById("urlInput").value;
 const loader = document.getElementById("loader");
 const cardDisplay = document.getElementById("cardDisplay");

 if (!url.trim()) {
   alert("Please enter a valid URL");
   return;
 }

 // Store the original URL
 originalUrl = url;

 loader.classList.remove("hidden");
 cardDisplay.innerHTML = '';
 currentIndex = 0;
 cardsData = [];

 try {
   // Your original API call
   const response = await fetch('/generate', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ url })
   });

   const data = await response.json();
   
   // Use the new chunking method
   cardsData = chunkTextIntoStoryCards(data.story);
   currentIndex = 0;
   totalCards = cardsData.length;
   
   showCurrentCard();
   updateNavButtons();

 } catch (err) {
   alert("Something went wrong. Please try another URL.");
   console.error(err);
 } finally {
   loader.classList.add("hidden");
 }
}

// Initialize nav buttons as hidden
document.addEventListener('DOMContentLoaded', function() {
 updateNavButtons();
});
