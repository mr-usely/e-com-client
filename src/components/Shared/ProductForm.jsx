import React from 'react'
import { Label, Input, Button, Textarea, Select } from '@windmill/react-ui'
import { AddIcon, ForbiddenIcon } from "../../icons";

class ProductForm extends React.Component {
    handleChange = ({ currentTarget: input }) => {
        const data = { ...this.state.data }
        data[input.name] = input.value
        this.setState({ data })
    }

    renderButton(text, disabled, block) {
        return <Button
            size="large"
            type="submit"
            block={block}
            iconLeft={disabled ? ForbiddenIcon : AddIcon}
            disabled={disabled ? true : false}
        >
            {text}
        </Button>
    }

    renderInput(name, label, type = "input", maxLength = "50") {
        const { data } = this.state
        return <Label>
            <Input
                className="mb-4"
                value={data[name]}
                type={type}
                name={name}
                onChange={this.handleChange}
                placeholder={label}
                maxLength={maxLength}
            />
        </Label>
    }

    renderTextArea(name, label, rows, type = "input", maxLength = "500") {
        const { data } = this.state
        return <Label>
            <Textarea
                className="mb-4"
                rows={rows}
                value={data[name]}
                type={type}
                name={name}
                onChange={this.handleChange}
                placeholder={label}
                maxLength={maxLength}
            />
        </Label>
    }

    renderSelectCategory(name) {
        const { data } = this.state
        return <Select
            className="mb-4"
            value={data[name]}
            name={name}
            onChange={this.handleChange}
        >
            <option>All</option>
            <option>Fertilizer</option>
            <option>Seedlings</option>
            <option>Insecticide</option>
        </Select>
    }

    renderSelectStatus(name) {
        const { data } = this.state
        return <Select
            className="mb-4"
            value={data[name]}
            name={name}
            onChange={this.handleChange}
        >
            <option>Not Active</option>
            <option>Active</option>

        </Select>
    }
}

export default ProductForm