import React, { useRef, useEffect, useState } from "react";
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
} from "@ionic/react";
import { pencilOutline, closeOutline } from "ionicons/icons";
import "./main.css";
import { useUpdateProduct } from "./GraphQl/Crud";
import ToastComponent from "./component/Toast";

interface Product {
  name: string;
  price: number;
  quantity: number;
  id: string;
}
interface Props {
  selectedProduct: Product;
  UpEvent: (response: Product) => void;
}

function ModifyIcon(props: Props) {
  const { handleUpdateProduct } = useUpdateProduct();
  const [isToastVisible, setToastVisible] = useState(false);

  const modal = useRef<HTMLIonModalElement>(null);
  useEffect(() => {
    if (props.selectedProduct) {
      setProduct(props.selectedProduct);
    }
  }, [props.selectedProduct]);

  function dismiss() {
    modal.current?.dismiss();
  }
  const emptyProduct = {
    name: "",
    price: 0,
    quantity: 0,
    id: "",
  };
  const handelUpdateProductAction = async () => {
    const response = await handleUpdateProduct(product);
    if (response) {
      props.UpEvent(response);
      dismiss();
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 500);
    }
  };
  const [product, setProduct] = useState<Product>(emptyProduct);
  const onInputUp = (e: CustomEvent<InputChangeEventDetail>, name: string) => {
    const val = e.detail.value || "";
    let updProduct: Product = { ...product, [name]: val };
    setProduct(updProduct);
  };
  return (
    <>
      <ToastComponent
        title="Produit modifié avec succès"
        isToastVisible={isToastVisible}
      ></ToastComponent>
      <IonButton
        className="modify-button"
        id={"open-modal-update" + product.id}
        expand="block"
      >
        <IonIcon className="modify-icon" icon={pencilOutline} />
      </IonButton>
      <IonContent className="ion-padding">
        <IonPage>
          <IonModal
            id="example-modal"
            ref={modal}
            trigger={"open-modal-update" + product.id}
          >
            <IonContent>
              <IonToolbar>
                <IonTitle>Détails du produit</IonTitle>
              </IonToolbar>
              <IonList>
                <IonItem>
                  <IonInput
                    label="Nom"
                    labelPlacement="stacked"
                    placeholder=""
                    type="text"
                    value={product.name}
                    onIonInput={(e: CustomEvent<InputChangeEventDetail>) =>
                      onInputUp(e, "name")
                    }
                  ></IonInput>
                </IonItem>
                <IonItem className="mt-2">
                  <IonInput
                    label="Prix unitaire"
                    labelPlacement="stacked"
                    type="number"
                    placeholder="$0.00"
                    value={product.price}
                    onIonInput={(e: CustomEvent<InputChangeEventDetail>) =>
                      onInputUp(e, "price")
                    }
                  ></IonInput>
                </IonItem>
                <IonItem className="mt-2 mb-1">
                  <IonInput
                    label="Quantité"
                    labelPlacement="stacked"
                    type="number"
                    placeholder="0"
                    value={product.quantity}
                    onIonInput={(e: CustomEvent<InputChangeEventDetail>) =>
                      onInputUp(e, "quantity")
                    }
                  ></IonInput>
                </IonItem>
              </IonList>
            </IonContent>

            <div className="custom-action-block">
              <IonButton
                onIonFocus={dismiss}
                className="custom-cancel-button mb-2"
              >
                Annuler
              </IonButton>
              <IonButton
                onIonFocus={handelUpdateProductAction}
                className="custom-submit-button mb-2"
              >
                Enregistrer
              </IonButton>
            </div>
          </IonModal>
        </IonPage>
      </IonContent>
    </>
  );
}

export default ModifyIcon;
