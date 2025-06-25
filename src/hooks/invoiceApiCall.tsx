import Toast from 'react-native-toast-message'
import { useCreateInvoiceMutation } from '../redux/Apis/invoiceApis'

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
