import React from 'react';
import { TouchableOpacity, Text } from 'react-native-ui-lib';

const Button = ({ onPress, text, ...rest }) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1} {...rest}>
            <Text>{text}</Text>
        </TouchableOpacity>
    )
};

export default Button;