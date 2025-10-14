import Toast from 'react-native-toast-message';
import {
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useMarkInvoiceAsPaidMutation,
  useUpdateInvoiceMutation,
} from '../redux/Apis/invoiceApis';
import { useGlobalContext } from '../providers/GlobalContextProvider';

export const useCreateInvoice = () => {
  const {english} = useGlobalContext();
  const [createInvoice, {isLoading}] = useCreateInvoiceMutation();
  const createInvoiceHandler = (data: any, handler?: () => void) => {
    createInvoice(data)
      .unwrap()
      .then(res => {
        console.log(res);
        Toast.show({
          type: 'success',
          text1: english?'Invoice created':'Facture créée',
          text2: res?.message || english?'Invoice created successfully.' : "Facture créée avec succès.",
        });
        handler?.();
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: english?'Failed to create invoice':'Échec de la création de la facture',
          text2: err.data?.message || english?'Failed to create invoice.' : "Échec de la création de la facture.",
        });
      });
  };
  return {createInvoiceHandler, isLoading};
};

export const useUpdateInvoice = () => {
  const {english} = useGlobalContext();
  const [updateInvoice, {isLoading}] = useUpdateInvoiceMutation();
  const updateInvoiceHandler = (
    data: any,
    id: string,
    handler?: () => void,
  ) => {
    updateInvoice({data, id})
      .unwrap()
      .then(res => {
        Toast.show({
          type: 'success',
          text1: english?'Invoice updated':'Facture mise à jour',
          text2: res.data?.message || english?'Invoice updated successfully.' : "Facture mise à jour avec succès.",
        });
        handler?.();
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: english?'Failed to update invoice':'Échec de la mise à jour de la facture',
          text2: err.data?.message || english?'Failed to update invoice.' : "Échec de la mise à jour de la facture.",
        });
      });
  };
  return {updateInvoiceHandler, isLoading};
};

export const deleteInvoice = () => {
  const {english} = useGlobalContext();
  const [deleteInvoice, {isLoading}] = useDeleteInvoiceMutation();
  const deleteInvoiceHandler = (id: string, handler?: () => void) => {
    deleteInvoice(id)
      .unwrap()
      .then(res => {
        Toast.show({
          type: 'success',
          text1: english?'Invoice deleted':'Facture supprimée',
          text2: res.data?.message || english?'Invoice deleted successfully.' : "Facture supprimée avec succès.",
        });
        handler?.();
      })
      .catch(err => {
        Toast.show({
          type: 'error',
          text1: english?'Failed to delete invoice':'Échec de la suppression de la facture',
          text2: err.data?.message || english?'Failed to delete invoice.' : "Échec de la suppression de la facture.",
        });
      });
  };
  return {deleteInvoiceHandler, isLoading};
};

export const useMarkPaidUnpaid = () => {
  const {english} = useGlobalContext();
  const [markPaidUnpaid, {isLoading}] = useMarkInvoiceAsPaidMutation();
  const markPaidUnpaidHandler = (id: string, handler?: () => void) => {
    markPaidUnpaid(id)
      .unwrap()
      .then(res => {
        Toast.show({
          type: 'success',
          text1: english?'Invoice marked as paid':'Facture marquée comme payée',
          text2: res?.message || english?'Invoice marked as paid successfully.' : "Facture marquée comme payée avec succès.",
        });
        handler?.();
      })
      .catch(err => {
        console.log(err);
        Toast.show({
          type: 'error',
          text1: english?'Failed to mark invoice as paid':'Échec de la mise à jour de la facture',
          text2: err.data?.message || english?'Failed to mark invoice as paid.' : "Échec de la mise à jour de la facture.",
        });
      });
  };
  return {markPaidUnpaidHandler, isLoading};
};
