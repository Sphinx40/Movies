import React, { useEffect, Fragment } from 'react';
import { Segment, Button, Image, List, Rail } from 'semantic-ui-react';
import { connect } from 'react-redux';

const Favourites = ({ state, itemDelete, history }) => {
    const { favourites } = state;

    const onhandleClick = (id) => {
        itemDelete(id)
    }

    const itemClick = (id) => {
        console.log(id)
        history.push(`/movie/${id}`)
    }

    return (
        <Fragment>
        {favourites.length===0 ? null :
        <Segment raised>
            <List divided verticalAlign='middle'>
                {favourites.map((item,id) => (
                    <List.Item key={id}>
                    <List.Content floated='right'>
                        <Button color='black' onClick={() => onhandleClick(id)}>Delete</Button>
                    </List.Content>
                    <Image avatar src={item.img} />
                    <List.Content as='a' onClick={() => itemClick(item.id)}>{item.title}</List.Content>
                </List.Item>
                ))}
            </List>
        </Segment>}</Fragment>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        itemDelete: (id) => {
            dispatch({type: 'DELETE', payload: id})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Favourites);