import React from 'react';

import { Box, Button, DialogActions, DialogContent, Grid, MenuItem, Select, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';

export default function NewEventDialog({
    onCancel,
    onCreate,
    dialogOpen,
    setDialogOpen,
    onClose,
    value,
    label,
    options,
    onChange,
}) {
    const selectId = `${label}-select`;
    const labelId = `${selectId}-label`;

    return (
        <Grid container alignItems="center" spacing={1}>
            <Dialog open={dialogOpen} onClose={onClose}>
                <DialogContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Create new event</Typography>
                    </Box>
                    <Select
                        labelId={labelId}
                        id={selectId}
                        label={label}
                        value={value ?? ''}
                        onChange={event => onChange(event.target.value as string)}
                    >
                        {options.map((option, id) => (
                            <MenuItem key={id} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained" color="secondary" onClick={onCreate} autoFocus>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
