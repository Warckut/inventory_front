import {useState} from 'react'

function useAuthForm() {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
}