import Toast from 'react-native-toast-message'
import { useCreateInvoiceMutation, useDeleteInvoiceMutation, useUpdateInvoiceMutation } from '../redux/Apis/invoiceApis'

export const useCreateInvoice = () => {
  const [createInvoice, { isLoading }] = useCreateInvoiceMutation()
  const createInvoiceHandler = (data: any, handler?: () => void) => {
    createInvoice(data).then((res) => {
      Toast.show({
        type: 'success',
        text1: 'Invoice created',
        text2: res.data?.message || 'Invoice created successfully.',
      })
      handler?.()
    }).catch((err) => {
      Toast.show({
        type: 'error',
        text1: 'Failed to create invoice',
        text2: err.data?.message || 'Failed to create invoice.',
      })
    })
  }
  return { createInvoiceHandler, isLoading }
}

export const useUpdateInvoice = () => {
  const [updateInvoice, { isLoading }] = useUpdateInvoiceMutation()
  const updateInvoiceHandler = (data: any, handler?: () => void) => {
    updateInvoice(data).then((res) => {
      Toast.show({
        type: 'success',
        text1: 'Invoice updated',
        text2: res.data?.message || 'Invoice updated successfully.',
      })
      handler?.()
    }).catch((err) => {
      Toast.show({
        type: 'error',
        text1: 'Failed to update invoice',
        text2: err.data?.message || 'Failed to update invoice.',
      })
    })
  }
  return { updateInvoiceHandler, isLoading }
}

export const deleteInvoice = () => {
  const [deleteInvoice, { isLoading }] = useDeleteInvoiceMutation()
  const deleteInvoiceHandler = (id: string, handler?: () => void) => {
    deleteInvoice(id).then((res) => {
      Toast.show({
        type: 'success',
        text1: 'Invoice deleted',
        text2: res.data?.message || 'Invoice deleted successfully.',
      })
      handler?.()
    }).catch((err) => {
      Toast.show({
        type: 'error',
        text1: 'Failed to delete invoice',
        text2: err.data?.message || 'Failed to delete invoice.',
      })
    })
  }
  return { deleteInvoiceHandler, isLoading }
}