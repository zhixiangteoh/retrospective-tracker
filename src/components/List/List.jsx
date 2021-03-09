import React, { useState } from "react";

import Box from "components/Box";

const List = () => {
    const [value, setValue] = useState("");
    const [items, setItems] = useState([]);

    const handleInputChange = ({ target: { value } }) => setValue(value);

    const addItem = (event) => {
        const { target: { value }, key } = event;
        if (key.toLowerCase() === "enter" && value.trim().length > 0) {
            setItems([...items, value]);
            setValue("");
        }
    }

    return (
        <Box display="flex" flexDirection="column" height="100%">
            {/* input bar */}
            <Box flexShrink="0" mb={4}>
                <input autoFocus type="text" onKeyPress={addItem} value={value} onChange={handleInputChange} />
            </Box>

            {/* item list */}
            <Box overflowY="auto" flexGrow="1">
                <ul>
                    {items.map((item) => 
                        <li>{item}</li>
                    )}
                </ul>
            </Box>
        </Box>
    );
}

export default List;