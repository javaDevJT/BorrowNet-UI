import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import * as PropTypes from "prop-types";

class SearchBarComponent extends React.Component {
    render() {
        let {placeholder} = this.props;
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Paper component="form" sx={{p: '2px 4px', display: 'flex', alignItems: 'center', width: 400}}>
                    <InputBase sx={{ml: 1, flex: 1}} placeholder={placeholder}/>
                    <IconButton type="button" sx={{p: '10px'}} aria-label="search">
                        <SearchIcon/>
                    </IconButton>
                </Paper>
            </div>
        );
    }
}

SearchBarComponent.propTypes = {placeholder: PropTypes.any}

export default SearchBarComponent