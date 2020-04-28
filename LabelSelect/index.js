/**
 * Created by TinySymphony on 2017-01-03. edited by Yonimdo at 2020-04-28 corona time 
 */
import React, {  useState } from 'react';
import { View, Text, Image, Modal, ScrollView, StyleSheet, TouchableHighlight, Dimensions } from 'react-native';
import Styles, {IMG} from './LabelSelectStyle';


function LabelSelect(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const addIcon = { uri: IMG.addIcon }

    let tempSelected = []

    props.options.map((option) => {
        option.isSelected = props.selectedOptions.includes(option);
    });
    const toggleSelect = (data) => {
        // if(tempSelected.includes(data))
        if (data.isSelected) {
            tempSelected.filter(d => { data.code == d.code })
        } else {
            tempSelected.push(data);
        };
    }
    return (
        <View style={[Styles.selectedView]}>
            {props.selectedOptions.map((item) => (
                <Label key={item.code} data={item} onCancel={()=>{props.onCancelItem}}>{item.title}</Label>
            ))}

            {!props.readOnly &&<TouchableHighlight
                style={[Styles.selectedItem, Styles.addItem]}
                underlayColor="transparent"
                onPress={() => setIsModalVisible(true)}>
                <Image
                    style={Styles.addIcon}
                    source={addIcon}
                    resizeMode="cover"
                />
            </TouchableHighlight>}
            {!props.readOnly && <Modal
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => { }}>
                <View style={{ flex: 1 }}>
                    <TouchableHighlight
                        style={Styles.modalMask}
                        activeOpacity={1}
                        underlayColor="#00000077"
                        onPress={() => setIsModalVisible(false)}>
                        <View style={Styles.modalContainer}>
                            <View style={Styles.modal}>
                                <View style={Styles.title}><Text style={Styles.titleText}>{props.title}</Text></View>
                                <View style={Styles.scrollView}>
                                    <ScrollView>
                                        {props.options.map((item) => (<ModalItem key={item.key}
                                            isSelected={item.isSelected} data={item} toggleSelect={toggleSelect} >
                                            {item.title}</ModalItem>))}
                                    </ScrollView>
                                </View>
                                <View style={[Styles.buttonView]}>
                                    <TouchableHighlight
                                        underlayColor="transparent"
                                        activeOpacity={0.8}
                                        onPress={() => setIsModalVisible(false)}>
                                        <View style={[Styles.modalButton, props.cancelButton || {}]}>
                                            <Text style={[Styles.buttonText, props.cancelText || {}]}>Cancel</Text>
                                        </View>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        underlayColor="transparent"
                                        activeOpacity={0.8}
                                        onPress={() => {
                                            setIsModalVisible(false)
                                            props.onConfirm(tempSelected);
                                            tempSelected = [];
                                        }}>
                                        <View style={[Styles.modalButton, Styles.confirmButton, props.confirmButton || {}]}>
                                            <Text style={[Styles.buttonText, props.confirmText || {}]}>Confirm</Text>
                                        </View>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </Modal>}
        </View>
    );
}

function Label(props) {
    const closeIcon = { uri: IMG.closeIcon };
    return (
        <View style={[Styles.selectedItem, !props.enable && Styles.disableColor]}>
            <Text style={[Styles.labelText, !props.enable && Styles.disableText || {}]}
                numberOfLines={1} >
                    {props.children}
            </Text>
            {!props.readOnly && <TouchableHighlight
                style={Styles.closeContainer}
                underlayColor="transparent"
                activeOpacity={0.5}
                onPress={()=>{props.onCancel(props.data)}}>
                <View>
                    <Image
                        style={Styles.closeIcon}
                        source={closeIcon}
                        resizeMode="cover" />
                </View>
            </TouchableHighlight>}
        </View>
    );
}

function ModalItem(props) {
    const [isSelected, setIsSelected] = useState(props.isSelected);
    return (
        <TouchableHighlight
            activeOpacity={0.5}
            underlayColor="transparent"
            onPress={() => {
                setIsSelected(!isSelected);
                props.toggleSelect(props.data);
            }}>
            <View style={Styles.modalItem}>
                <Text
                    style={[Styles.modalText]}
                    numberOfLines={1}>
                    {props.children}
                </Text>
                <View style={[Styles.outerCircle, isSelected ? Styles.enableCircle : {}]}>
                    {isSelected && <View style={[Styles.innerCircle]} />}
                </View>
            </View>
        </TouchableHighlight>
    );
}

export default LabelSelect;
