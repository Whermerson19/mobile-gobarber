import React, { useEffect, useRef, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { TextInputProps } from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

import { useField } from "@unform/core";

import { Container, TextInput } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {

    const [isFocus, setIsFocus] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
    const inputElementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        }
    }));

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value })
            },
            clearValue() {
                inputValueRef.current.value = 'value';
                inputElementRef.current.clear();
            }
        })
    }, [registerField, fieldName]);

    const handleInputFocus = useCallback(() => { setIsFocus(true) }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocus(false);

        setIsFilled(!!inputValueRef.current.value);
    }, []);

    return (
        <Container isFocus={isFocus} isErrored={!!error} >

            <Icon name={icon} size={20} color={ isFocus || isFilled ? "#ff9000" : "#666360" } />

            <TextInput 
                ref={inputElementRef}
                keyboardAppearance="dark"
                placeholderTextColor="#666360"
                defaultValue={defaultValue} 
                onChangeText={ (value) => inputValueRef.current.value = value }
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...rest} 
            />
        </Container>
    );
};

export default forwardRef(Input);