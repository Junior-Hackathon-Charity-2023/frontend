import Overlay from "../overlay/Overlay";
import {arrayWithValues, moveItem, moveItemByKeyboard, shuffle} from "../../utils/utils";
import CellImage from "../cell/CellImage";
import React from "react";
import getImagesForDimension from "../../mockdata/data";
import {Button} from "../button/Button";
import ModalWin from "../modals/ModalWin";

const DEFAULT_DIMENSION = 4

class Field extends React.Component {

    constructor(props) {
        super(props);

        let dimension = DEFAULT_DIMENSION
        let images = getImagesForDimension(dimension)

        const randomIndex = Math.floor(Math.random() * images.length);
        let initialImages = new Array(...images)
        initialImages.splice(randomIndex, 1, null)
        console.log(arrayWithValues(initialImages))

        this.state = {
            dimension: dimension,
            initialImages: initialImages,
            currentImagesState: shuffle(initialImages),
            modalIsOpen: false,
        }
    }

    onCellClick = (index) => {
        let newImages = moveItem(this.state.currentImagesState, index, this.state.dimension)
        this.setState({
            currentImagesState: newImages
        });
        this.checkWin(newImages)
    }

    handleKeyDown = (event) => {
        let newImages = moveItemByKeyboard(this.state.currentImagesState, event.key, this.state.dimension)
        this.setState({
            currentImagesState: newImages
        });
        this.checkWin(newImages)
    }
    checkWin = (currentImages) => {
        let initialImages = this.state.initialImages
        if (currentImages.length !== initialImages.length) {
            return
        }
        if (!currentImages.every((element, index) => element === initialImages[index])) {
            return;
        }
        this.setState({modalIsOpen: true})

    }

    onNewGame = () => { 
        let dimension = this.state.dimension
        let images = getImagesForDimension(dimension)

        const randomIndex = Math.floor(Math.random() * images.length);
        let initialImages = new Array(...images)
        initialImages.splice(randomIndex, 1, null)
        console.log(arrayWithValues(initialImages))

        this.setState({
            initialImages: initialImages,
            currentImagesState: shuffle(initialImages)
        })
    }

    onNewDimension = (dimension) => { // TODO: добавить селектор/инпут
        this.setState({
            dimension: dimension,
        })
        this.onNewGame()
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }


    render() {
        const modal = this.state.modalIsOpen ? <ModalWin open={this.state.modalIsOpen} setOpen={(modalIsOpen) => this.setState({modalIsOpen})} /> : <></>

        return (
            <>
                <div className="relative">
                    <div
                        className="grid cell relative overflow-hidden rounded-sm border-4 border-solid border-gray-600">
                        <Overlay/>
                        {this.state.currentImagesState.map((image, i) => (
                            <CellImage key={i} image={image} index={i} onClick={() => {
                                this.onCellClick(i)
                            }}/>
                        ))}
                    </div>
                </div>
                {modal}
                <div className="mt-2 flex justify-center">
                    <Button text={'Новая игра!'} onClick={this.onNewGame}/>
                </div>
            </>
        )
    }
}


export default Field;