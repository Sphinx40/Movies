import React, { useState, useEffect, Fragment } from 'react';
import { Button, Segment, Grid, Input, Card, Image, Icon, Divider, Label, Container, Rail } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Spinner from '../spinner/spinner';

const List = ({ history, state, change, favouriteClick }) => {
    const [movieList, setMovieList] = useState([])
    const { search } = state;
    const [searchCopy, setSearchCopy] = useState()
    const [active, setActive] = useState(false);
    const [active2, setActive2] = useState(false);
    useEffect(() => {
        axios.get(`https://www.omdbapi.com/?apikey=71cbb5c0&s=${search}`)
            .then((res) => {
                setMovieList(res.data.Search)
                setActive(true)
                setActive2(true)
            })
            .catch((err) => console.log(err))
    }, [search])

    const onhandleClick = (id) => {
        history.push(`/movie/${id}`)
    }

    const searchMovie = () => {
        if (searchCopy !== undefined){
            change(searchCopy)
            setActive2(false)
        }
        
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (searchCopy !== undefined){
                change(searchCopy)
                setActive2(false)
            }
        }
    } 

    const onClickHeart = (title,img,id) => {
        favouriteClick(title,img,id)
    }

    return (
        <Fragment>

       {active ? <Segment attached >
            <Input
                fluid
                icon={() => (<Icon name='search' inverted circular link onClick={searchMovie} />)}
                placeholder='Search...'
                value={searchCopy}
                onKeyDown={handleKeyDown}
                onChange={(e) => setSearchCopy(e.target.value)}
            />
            { active2 ? 
            <Fragment>
            <Divider hidden />
            <Grid columns={4}>
                <Grid.Row>
                    {movieList === undefined ? <h2>No results found.</h2> : movieList.map((movie, id) => (
                        <Grid.Column key={id}>
                            <Card>
                                <Image src={movie.Poster} />
                                <Label as='a' color='black' attached='top right' onClick={() => onClickHeart(movie.Title,movie.Poster,movie.imdbID)}><Icon name='heart' color='pink'/></Label>
                                <Card.Content>
                                    <Card.Header>{movie.Title}</Card.Header>
                                    <Card.Meta>{movie.Year}</Card.Meta>
                                    <Card.Description>
                                        {movie.Type}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Button animated color='black' onClick={() => onhandleClick(movie.imdbID)}>
                                    <Button.Content visible>View</Button.Content>
                                        <Button.Content hidden>
                                            <Icon name='arrow right' />
                                        </Button.Content>
                                    </Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    ))}
                </Grid.Row>
            </Grid></Fragment> : <Container textAlign='center'><Spinner /></Container>}
        </Segment> : <Container textAlign='center'><Spinner /></Container>}
        </Fragment>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        state
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        change: (item) => {
            dispatch({ type: 'SEARCH', payload: item })
        },
        favouriteClick: (title,img,id) => {
            dispatch({ type: 'FAVS', payload: {title,img,id}})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(List));