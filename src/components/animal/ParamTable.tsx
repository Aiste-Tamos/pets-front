import React from 'react';

import { Box, makeStyles } from '@material-ui/core';

interface KeyValue {
    title: string;
    value: string | undefined;
}

interface ParamTableProps {
    items: KeyValue[];
}

const useStyles = makeStyles(theme => ({
    row: {
        borderBottom: `1px solid ${theme.palette.grey[300]}`,
        fontSize: 16,
    },
    title: {
        fontWeight: 600,
    },
    value: {
        color: `rgba(${theme.palette.common.black}, 0.54)`,
    },
}));

export default function ParamTable({ items }: ParamTableProps) {
    const classes = useStyles();

    return (
        <Box>
            {items.map((param: KeyValue, id: number) => (
                <Box p={1} display="flex" justifyContent="space-between" key={id} className={classes.row}>
                    <Box className={classes.title}>{param.title}</Box>
                    <Box className={classes.value}>{param.value}</Box>
                </Box>
            ))}
        </Box>
    );
}
