
import React, { useRef } from "react";
import { useFormik } from 'formik';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { RadioButton } from "primereact/radiobutton";

export default function FormikDoc() {
    const toast = useRef(null);

    const radioBtns = [
        {
            id: 'cheese',
            name: 'cheese',
            value: 'Cheese',
            inputId: 'f1'
        },
        {
            id: 'mushroom',
            name: 'mushroom',
            value: 'Mushroom',
            inputId: 'f2'
        },
        {
            id: 'pepper',
            name: 'pepper',
            value: 'Pepper',
            inputId: 'f3'
        },
        {
            id: 'onion',
            name: 'onion',
            value: 'Onion',
            inputId: 'f4'
        }
    ];

    const show = () => {
        toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: formik.values.item });
    };

    const formik = useFormik({
        initialValues: {
            item: ''
        },
        validate: (data) => {
            let errors = {};

            if (!data.item) {
                errors.item = 'Value is required.';
            }

            return errors;
        },
        onSubmit: (data) => {
            data.item && show();
            formik.resetForm();
        }
    });

    const isFormFieldInvalid = (name) => !!(formik.touched[name] && formik.errors[name]);

    const getFormErrorMessage = (name) => {
        return isFormFieldInvalid(name) ? <small className="p-error">{formik.errors[name]}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex justify-content-center">
            <form onSubmit={formik.handleSubmit} className="flex flex-column gap-2">
                <div>
                <RadioButton value="Pepper"/>hello
                </div>
                <div>Please choose your ingredient.</div>
                <div style={{display: 'flex',flexDirection: "row"}}>
                    <Toast ref={toast} />
                    {radioBtns.map((btn, i) => {
                        return (
                            <div key={i} className="flex align-items-center mr-3">
                                <RadioButton
                                    {...btn}
                                    checked={formik.values.item === btn.value}
                                    onChange={(e) => {
                                        formik.setFieldValue('item', e.value);
                                    }}
                                />
                                <label htmlFor={btn.inputId} className="ml-1">
                                    {btn.name}
                                </label>
                            </div>
                        );
                    })}
                </div>
                {getFormErrorMessage('item')}
                <Button type="submit" label="Submit" />
            </form>
        </div>
    )
}