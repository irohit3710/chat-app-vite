// export const BASE_URL = 'https://chitchatbackend-6cjq.onrender.com' 
export const BASE_URL = 'http://localhost:8000/api/v1'

export const randomPassword = () => {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*)=_+[}?';
    const length = 12;

    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;

    let password = '';

    //at least one character 
    password += getRandomChar(uppercaseChars);
    password += getRandomChar(lowercaseChars);
    password += getRandomChar(numberChars);
    password += getRandomChar(specialChars);

    // Generate the rest of the password
    for (let i = password.length; i < length; i++) {
        password += getRandomChar(allChars);
    }

    // Shuffle the password to randomize the order of characters
    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}


export const getRandomChar = (characters) =>{
    const randomIndex = Math.floor(Math.random() * characters.length);
    return characters[randomIndex];
}

