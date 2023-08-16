import React, { useRef, useState, useEffect } from 'react';
import {
    IonButton,
    IonModal,
    IonContent,
    IonToolbar,
    IonTitle,
    IonPage,
    IonList,
    IonItem,
    IonIcon,
    IonInput,
    InputChangeEventDetail,
    useIonToast
} from '@ionic/react';
import { addCircleOutline, closeOutline } from 'ionicons/icons';

import { useAddProduct } from './GraphQl/Crud'

import './main.css';
import ToastComponent from './component/Toast';

interface Product {
    name: string;
    price: number;
    quantity: number;
    id: string;
}
interface Props {
    CountProduct: number;
    handleEvent: (response: Product) => void;
}


function AddButton(props: Props) {
    const [present] = useIonToast();
    const { handleAddProduct } = useAddProduct();
    const modal = useRef<HTMLIonModalElement>(null);

    function dismiss() {
        console.log('modal', modal)
        modal.current?.dismiss();
    }
    function generateUniqueKey(): string {
        const timestamp = Date.now().toString();
        const random = Math.random().toString(36).substring(2, 10);
        return timestamp + random;
    }
    useEffect(() => {
        let count = generateUniqueKey();
        let updatedProduct: Product = { ...product, ['id']: count };
        setProduct(updatedProduct);
    }, [props.CountProduct]);

    const emptyProduct = {
        name: "",
        price: 0,
        quantity: 0,
        id: "",
    }
    const saveProduct = async () => {
        const response = await handleAddProduct(product)
        if (response) {
            props.handleEvent(response);
            dismiss();
            setToastVisible(true);
            setTimeout(() => {
                setToastVisible(false);
            }, 500);
           
        }

    };
    const [product, setProduct] = useState<Product>(emptyProduct);
    const [isToastVisible, setToastVisible] = useState(false);

    const onInputChange = (e: CustomEvent<InputChangeEventDetail>, name: string) => {
        const val = e.detail.value || "";
        let updatedProduct: Product = { ...product, [name]: val };
        setProduct(updatedProduct);
    };
    return (


        <>
        <ToastComponent title="Produit ajouté avec succès" isToastVisible={isToastVisible}></ToastComponent>
            <IonButton className='add-button' id="open-modal-add" expand="block">
                <IonIcon className='add-icon' icon={addCircleOutline} /><div className='add-title'>Ajouter un produit</div>
            </IonButton>  <IonContent className="ion-padding"> <IonPage>
                <IonModal id="example-modal" ref={modal} trigger="open-modal-add" >
                    <IonContent>
                        <IonToolbar>
                            <IonTitle>Détails du produit</IonTitle>
                        </IonToolbar>
                        <IonList>
                            <IonItem >
                                <IonInput
                                    label="Nom"
                                    labelPlacement="stacked"
                                    placeholder=""
                                    value={product.name}
                                    onIonInput={(e: CustomEvent<InputChangeEventDetail>) => onInputChange(e, "name")}

                                ></IonInput>
                            </IonItem>
                            <IonItem className="mt-2 " >
                                <IonInput
                                    label="Prix unitaire"
                                    labelPlacement="stacked"
                                    placeholder="$0.00"
                                    type="number"
                                    value={product.price}
                                    onIonInput={(e: CustomEvent<InputChangeEventDetail>) => onInputChange(e, 'price')}
                                ></IonInput>

                            </IonItem>
                            <IonItem className="mt-2 mb-1">
                                <IonInput
                                    label="Quantité"
                                    labelPlacement="stacked"
                                    placeholder="0"
                                    type="number"
                                    value={product.quantity}
                                    onIonInput={(e: CustomEvent<InputChangeEventDetail>) => onInputChange(e, 'quantity')}

                                ></IonInput>
                            </IonItem>
                        </IonList>
                    </IonContent>
                    <div className='custom-action-block'>
                        <IonButton onIonFocus={dismiss} className="custom-cancel-button mb-2">Annuler</IonButton>
                        <IonButton onIonFocus={saveProduct} className="custom-submit-button mb-2">Enregistrer</IonButton>
                    </div>
                </IonModal></IonPage>
            </IonContent></>



    );
}

export default AddButton;