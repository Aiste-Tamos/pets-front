import React, { useState } from 'react';
import { useParams } from 'react-router';

import {
    Box,
    Button,
    DialogActions,
    DialogContent,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { Event } from '../../../graphql/types';

interface RouterParams {
    id: string;
}

export default function NewEventDialog({
    categoryOptions,
    dialogOpen,
    onCancel,
    onCreate,
    typeOptions,
}: NewEventDialogProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const params: RouterParams = useParams();
    const { id: animalID } = params;

    const [eventType, setEventType] = useState('');
    const [eventCategory, setEventCategory] = useState('');
    const [eventExpenses, setEventExpenses] = useState('');
    const [eventComments, setEventComments] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [typeError, setTypeError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [expensesError, setExpensesError] = useState(false);
    const [commentsError, setCommentsError] = useState(false);
    const [dateError, setDateError] = useState(false);

    const handleTypeChange = e => {
        setTypeError(false);
        setEventType(e.target.value);
    };

    const handleCategoryChange = e => {
        setCategoryError(false);
        setEventCategory(e.target.value);
    };

    const handleExpensesChange = e => {
        setExpensesError(false);
        setEventExpenses(e.target.value);
    };

    const handleCommentsChange = e => {
        setCommentsError(false);
        setEventComments(e.target.value);
    };

    const handleDateChange = e => {
        setDateError(false);
        setEventDate(e.target.value);
    };

    const handleTypeOnBlur = () => {
        if (!eventType) {
            setTypeError(true);
        }
    };

    const handleCategoryOnBlur = () => {
        if (!eventCategory) {
            setCategoryError(true);
        }
    };

    const handleExpensesOnBlur = () => {
        if (!eventExpenses) {
            setExpensesError(true);
        }
    };

    const handleCommentsOnBlur = () => {
        if (!eventComments) {
            setCommentsError(true);
        }
    };

    const handleCreate = () => {
        if (!eventType || !eventCategory || !eventExpenses || !eventComments || !eventDate) {
            setError(true);
            setErrorMessage('Please fill in all the fields');
            if (!eventType) {
                setTypeError(true);
            }
            if (!eventCategory) {
                setCategoryError(true);
            }
            if (!eventExpenses) {
                setExpensesError(true);
            }
            if (!eventComments) {
                setCommentsError(true);
            }
            if (!eventDate) {
                setDateError(true);
            }
            return;
        }

        const newEvent = createEvent(eventType, eventCategory, eventExpenses, eventComments, eventDate);
        onCreate(newEvent);
        cleanDialog();
    };

    const createEvent = (type, category, expenses, comments, date): Event => {
        return {
            id: 123456,
            animal: +animalID,
            type: { id: typeOptions.indexOf(eventType), type },
            category,
            expenses: +expenses,
            comments,
            dateTime: Date.parse(date).toString(),
        };
    };

    const cleanDialog = () => {
        setEventType('');
        setEventCategory('');
        setEventExpenses('');
        setEventComments('');
        setEventDate('');
        setTypeError(false);
        setCategoryError(false);
        setExpensesError(false);
        setCommentsError(false);
        setDateError(false);
        setError(false);
        onCancel(false);
    };

    const handleCancel = () => {
        cleanDialog();
    };

    return (
        <Dialog fullWidth maxWidth="sm" open={dialogOpen} fullScreen={fullScreen} onClose={onCancel}>
            <DialogContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Create new event</Typography>
                </Box>
                <Box marginTop={2.5} marginBottom={2.5}>
                    <FormControl variant="outlined" color="secondary" fullWidth>
                        <InputLabel id="type">Type</InputLabel>
                        <Select
                            labelId="type"
                            label="Type"
                            value={eventType ?? ''}
                            onBlur={handleTypeOnBlur}
                            onChange={handleTypeChange}
                            error={typeError}
                        >
                            {typeOptions.map((option, id) => (
                                <MenuItem key={id} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box marginTop={2.5} marginBottom={2.5}>
                    <FormControl variant="outlined" color="secondary" fullWidth>
                        <InputLabel id="category">Category</InputLabel>
                        <Select
                            labelId="category"
                            label="Category"
                            value={eventCategory ?? ''}
                            onBlur={handleCategoryOnBlur}
                            onChange={handleCategoryChange}
                            error={categoryError}
                        >
                            {categoryOptions.map((option, id) => (
                                <MenuItem key={id} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box marginTop={2.5} marginBottom={2.5}>
                    <TextField
                        id="expenses"
                        label="Expenses $"
                        value={eventExpenses ?? ''}
                        onBlur={handleExpensesOnBlur}
                        onChange={handleExpensesChange}
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        type="number"
                        error={expensesError}
                    />
                </Box>
                <Box marginTop={2.5} marginBottom={2.5}>
                    <TextField
                        id="comments"
                        label="Comments..."
                        value={eventComments ?? ''}
                        onBlur={handleCommentsOnBlur}
                        onChange={handleCommentsChange}
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        multiline
                        rows={4}
                        rowsMax={6}
                        error={commentsError}
                    />
                </Box>
                <Box marginTop={2.5} marginBottom={2}>
                    <TextField
                        id="date"
                        label="Date"
                        value={eventDate ?? ''}
                        onChange={handleDateChange}
                        variant="outlined"
                        fullWidth
                        color="secondary"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        error={dateError}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Box flex="1" marginLeft={2}>
                    {error && (
                        <Typography variant="body1" color="error">
                            {errorMessage}
                        </Typography>
                    )}
                </Box>
                <Button variant="outlined" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="contained" color="secondary" onClick={handleCreate} autoFocus>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}

interface NewEventDialogProps {
    categoryOptions: string[];
    dialogOpen: boolean;
    onCancel: (boolean) => void;
    onCreate: (Event) => void;
    typeOptions: string[];
}
