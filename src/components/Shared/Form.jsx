import React from 'react'
import { Link } from 'react-router-dom'
import { Label, Input, Button } from '@windmill/react-ui'

class Form extends React.Component {
    handleChange = ({ currentTarget: input }) => {
        const data = { ...this.state.data }
        data[input.name] = input.value
        this.setState({ data })
    }

    renderButton(text, type) {
        return <Button type={type} className="mt-4" block >
            {text}
        </Button>
    }

    renderLink(linkText, to) {
        return <Link to={to} className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline">
            {linkText}
        </Link>
    }

    renderInput(name, label, type = "input", maxLength = "50") {
        const { data } = this.state
        return <Label className="mt-4">
            <span>{label}</span>
            <Input
                className="mt-1"
                type={type}
                name={name}
                value={data[name]}
                onChange={this.handleChange}
                placeholder={label === "Password" ? '****' : label}
                maxLength={maxLength}
            />
        </Label>
    }
}

export default Form