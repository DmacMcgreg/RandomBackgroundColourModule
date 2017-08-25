const body = document.getElementsByTagName('body')[0]

const usedColours = []


/**
 * Generate a random Hex Colour String of length 6 with a '#' prepended
 *
 * Use:       generateRandomHexString()
 * Example:     => '#000000' || '#fa0523'
 */
const generateRandomHexString = () => {
   const hexDomain = '0123456789abcdef'
   
   //Fancy and fun way of filling an array with a range of numbers
   //  This will generate an array with [0, 1, 2, 3, 4, 5]
   //       We can then map each key of the array to a random character in the hex code domain above
   //Finally, join the array into a string, and return the string with a '#' at the beginning
   let result = [ ...Array(6).keys() ].map(key => {
     return hexDomain.charAt(
       Math.floor(Math.random() * hexDomain.length)
     )
   }).join('')
  return `#${result}`;
}

/**
 * Set Random Colours On An Element
 *
 * Use:       setElement()({}), setElement(myElement)({maxSeconds: 20, interval: 2000})
 * Default:   document.body
 * Arguments: Any element you want to update the background colour on
 * Returns:   A partially-applied function into which 
              2 more arguments can be passed:           
                  maxSeconds: default 10 -> The length of the timer in seconds
                  interval: default 1000 ms -> The interval of the timer in milliseconds
 */
const setElement = (el = body) => {
    let timer 
    let count = 0

    return ({maxSeconds = 10, interval = 1000}) => {
        timer = setInterval( () => {
          
            let randomColour = generateRandomHexString()
            
            //Check to make sure we haven't used this colour before...
            if(!usedColours.includes(randomColour)){
              
              //Set the element's background to the random colour string we generated
              el.style.background = randomColour
              
              //Add this colour to the list of used colours
              usedColours.push(randomColour)
            }
            
            count += interval
         
            //If the amount of time left is less than the interval size, stop the timer
            if( ((maxSeconds * 1000) / count) <= 1){
              clearInterval(timer) 
            }
        }, interval)
    }
}

/**
 * Expose the Module's API
 */
export default {
  setElement
}

