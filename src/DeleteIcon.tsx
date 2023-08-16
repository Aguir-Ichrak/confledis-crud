import React, { useState } from "react";
import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { trashOutline } from "ionicons/icons";
import "./IconStyle.css";
import { useDeleteProduct } from "./GraphQl/Crud";
import ToastComponent from "./component/Toast";

interface Props {
  ProductId: string;
  DelEvent: (response: string) => void;
}

function DeleteIcon(props: Props) {
  const { handleDeleteProduct } = useDeleteProduct();

  const handelDeleteProductAction = async () => {
    const response = await handleDeleteProduct(props.ProductId);
    if (response) {
      props.DelEvent(response);
      setToastVisible(true);
      setTimeout(() => {
        setToastVisible(false);
      }, 500);
    }
  };

  const [isToastVisible, setToastVisible] = useState(false);

  return (
    <>
      <ToastComponent
        title="Produit supprimé avec succès"
        isToastVisible={isToastVisible}
      ></ToastComponent>
      <IonButton className="delete-icon" id={"delete-alert" + props.ProductId}>
        <IonIcon icon={trashOutline} />
      </IonButton>
      <IonAlert
        header="Etez-vous sur d'avoir supprimer cet produit ?"
        trigger={"delete-alert" + props.ProductId}
        buttons={[
          {
            text: "Non",
            role: "cancel",
          },
          {
            text: "Oui",
            role: "confirm",
            handler: async () => {
              await handelDeleteProductAction();
            },
          },
        ]}
      ></IonAlert>
    </>
  );
}
export default DeleteIcon;
