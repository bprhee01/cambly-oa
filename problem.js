
// Given a string of text, write a program that prints a list of unique words contained in the string
// along with the number of occurrences of each word in the string. The list should be sorted in
// descending order by frequency, and ascending order alphabetically when multiple words occur
// with the same frequency.

const isValidChar = (char) => {
  
  	char = char.toLowerCase();
  
    const charCode = char.charCodeAt();

    if(charCode === 32) return true; // when char is a space

    if(97 <= charCode && charCode <= 122) return true; //when char is a lowercase a or z

    if( 48 <= charCode && charCode <= 57) return true; // when char is num
    return false;

}


const getWordsFromString = (string) => {

   let returnedString = "";

   for(let charIndex = 0; charIndex < string.length; charIndex += 1) {
        
        if(isValidChar(string[charIndex])) returnedString += string[charIndex].toLowerCase();
   }

   return returnedString.split(" ")
}

const mergeSortedArrays = (arrayOne, arrayTwo) => {
        let sortedArray = []
       
        let [arrayOneIndexPointer,arrayTwoIndexPointer] = [0,0];

        while (arrayOneIndexPointer < arrayOne.length && arrayTwoIndexPointer < arrayTwo.length) {
          
          if (arrayOne[arrayOneIndexPointer] < arrayTwo[arrayTwoIndexPointer]) {
            sortedArray.push(arrayOne[arrayOneIndexPointer]);
            arrayOneIndexPointer += 1 ;
          } else {
            sortedArray.push(arrayTwo[arrayTwoIndexPointer]);
            arrayTwoIndexPointer += 1; 
          }
        }

        for(let i = arrayOneIndexPointer; i < arrayOne.length; i += 1){
            sortedArray.push(arrayOne[i])
        }
        for(let i = arrayTwoIndexPointer; i < arrayTwo.length; i += 1){
            sortedArray.push(arrayTwo[i])
        }
    
    	return sortedArray
}


const mergeSort = (arrayOfWords) => {

      const leftArrayLength = arrayOfWords.length / 2;

      if(arrayOfWords.length < 2) return arrayOfWords;
  
    	const leftArray = arrayOfWords.splice(0, leftArrayLength);

    	return mergeSortedArrays(mergeSort(leftArray),mergeSort(arrayOfWords))
}

const getFreqOfWordsAndLengthOfLongestWord = (listOfWords) => {

    const frequencyMap = {};

    let longestWordLength = 0;

    for(const word of listOfWords) {

        if (!frequencyMap.hasOwnProperty(word)) frequencyMap[word] = 1;
        else frequencyMap[word] = frequencyMap[word] + 1;

        if(word.length > longestWordLength) longestWordLength = word.length;

    }
    
    return [frequencyMap,longestWordLength];
}

const storeWordsByFrequency = (freqOfWords, longestWordLength) => {

    const wordsByFrequency = [];
  
  	for(let i = 0; i <= longestWordLength; i += 1){
      wordsByFrequency.push([]);
    }
  
 
    for(const word in freqOfWords) {

        const frequency = freqOfWords[word];

        wordsByFrequency[frequency].push(word);

    }

    return wordsByFrequency;

}

const printListOfUniqueWordsAndTheirFrequency = (string) => {

    const listOfWordsFromString = getWordsFromString(string);
    
    const [freqOfWords, longestWordLength] = getFreqOfWordsAndLengthOfLongestWord(listOfWordsFromString);
    
    const storedWordsByFrequency = storeWordsByFrequency(freqOfWords, longestWordLength); // index 1 holds all chars that are of 

    let returnedString = "";

    for(let freq = storedWordsByFrequency.length - 1; freq > 0; freq -= 1){

        const wordsOfCurrentFrequency = mergeSort(storedWordsByFrequency[freq]);
      	
        
        for(const word of wordsOfCurrentFrequency){
            returnedString += `${word} ${freq}`;
          	returnedString += "\n"
        }
    }

    return returnedString;
}


const stringOne = "This is a test. That is not a test. Test";
console.log("answer for the test prompt: \n")
console.log(printListOfUniqueWordsAndTheirFrequency(stringOne));

console.log("answer for the paragraph prompt: \n")
const stringTwo = "From the moment the first immigrrants arrived on these shores, generations of parents have worked hard and sacrificed whatever is necessary so that their children could have the same chances they had; or the chances they never had. Because while we could never ensure that our children would be rich or successful; while we could neveer be positive that they would do better that their parents, America is about making it possible to give them the chance. To give every child the opportunity to try. Education is still the foundation of this opportunity. And the most basic building block that holds the foundation together is still reading. At the dawn of the 21st century, in a world where knowledge is power and literacy is the skill that unlocks the gates of opportunity and success, we all have a responsibility as parents and librarians, educators and citizens, to instill in our children a love of reading so that we can give them the chance to fulfill their dreams";
console.log(printListOfUniqueWordsAndTheirFrequency(stringTwo))