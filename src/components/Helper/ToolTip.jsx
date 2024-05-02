import React from 'react'
import HelpIcon from '@mui/icons-material/Help';
import { Icon, Tooltip } from '@chakra-ui/react';

const passwordRules = {
    length: "1. Make sure your password is at least 12 characters long.",
    complexity: "2. Include a mix of uppercase letters, lowercase letters, numbers, and special characters.",
    avoidPatterns: "3. Don't use easily guessable patterns like '123456' or 'password'.",
    uniquePasswords: "4. Use a unique password for each account.",
    avoidPersonalInfo: "5. Don't include personal information like your name or birthdate.",
    randomness: "6. Generate random passwords that are not easily guessable.",
    regularUpdates: "7. Change your passwords periodically, especially for sensitive accounts.",
    useGenerateEandom: "8. You can use generate random password button below."
}

const ToolTip = () => {
    return (
        <>
            <Tooltip label={Object.values(passwordRules).map((rule, index) => <strong key={index}>{rule}<br/></strong>)} placement='bottom'  bg='white' color='orange.400' borderRadius='lg' shadow='lg'>
                <HelpIcon fontSize='12px'/>
            </Tooltip>
        </>
    )
}

export default ToolTip