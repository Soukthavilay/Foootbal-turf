import React, { Component } from 'react'
import ForUpdatePage from '../../components/ForUpdateWithListPage'
import { hoaDonDichVu, chiTietHoaDonDichVu } from '../../entities'
import apiRoutes from '../../routes/apis'
import { apiGet } from '../../utils'

class HoaDonDichVuForUpdate extends Component {
   constructor(props) {
      super(props)

      this.state = {
         employees: [],
         services: [],
         customers: []
      }
   }

   ////// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      const { fetchData } = this

      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchData = () => {
      const { fetchServices, fetchEmployees, fetchCustomers } = this

      fetchServices()
      fetchEmployees()
      fetchCustomers()
   }

   fetchServices = async () => {
      const url = apiRoutes.dichVu.getAll
      const queries = { pageSize: 1000 }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ services: data })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   fetchEmployees = async () => {
      const url = apiRoutes.nhanVien.getAll
      const queries = { pageSize: 1000 }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ employees: data })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   fetchCustomers = async () => {
      const url = apiRoutes.khachHang.getAll
      const queries = {
         pageSize: 1000
      }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ customers: data })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   ///// METHODS FOR COMPUTING VALUES /////

   getAllServices = () => {
      const { services } = this.state
      let allServices = []

      services.forEach(service => {
         allServices.push({
            value: service['maDichVu'],
            label: service['tenDichVu']
         })
      })

      return allServices
   }

   getAllEmployees = () => {
      const { employees } = this.state
      let allEmployees = []

      employees.forEach(employee => {
         allEmployees.push({
            value: employee['maNhanVien'],
            label: employee['tenNhanVien']
         })
      })

      return allEmployees
   }

   getAllCustomers = () => {
      const { customers } = this.state
      let allCustomers = []

      customers.forEach(customer => {
         allCustomers.push({
            value: customer['maKhachHang'],
            label: customer['tenKhachHang']
         })
      })

      return allCustomers
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { getAllCustomers, getAllServices, getAllEmployees } = this
      const { services } = this.state

      const settings = {
         entity: hoaDonDichVu,
         api: apiRoutes.hoaDonDichVu,
         fields: [
            {
               label: 'M?? h??a ????n',
               propForValue: 'soHDDV',
               type: 'input'
            },
            {
               label: 'Kh??ch h??ng',
               propForValue: 'maKhachHang',
               type: 'select',
               values: getAllCustomers(),
               propForItemValue: 'value',
               propForItemText: 'label'
            },
            {
               label: 'Nh??n vi??n',
               propForValue: 'maNhanVien',
               type: 'select',
               values: getAllEmployees(),
               propForItemValue: 'value',
               propForItemText: 'label'
            },
            {
               label: 'Ng??y s??? d???ng',
               propForValue: 'ngaySuDung',
               placeholder: 'Nh???p ng??y s??? d???ng d???ch v???',
               type: 'date',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Ng??y s??? d???ng d???ch v??? l?? th??ng tin b???t bu???c v?? kh??ng ???????c ????? tr???ng!'
                  }
               ]
            },
            {
               label: 'Ng??y l???p h??a ????n',
               propForValue: 'ngayLap',
               placeholder: 'Nh???p ng??y l???p h??a ????n',
               type: 'date',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Ng??y l???p h??a ????n l?? th??ng tin b???t bu???c v?? kh??ng ???????c ????? tr???ng!'
                  }
               ]
            },
            {
               label: 'Ghi ch??',
               propForValue: 'ghiChu',
               placeholder: 'Nh???p ghi ch?? v??? h??a ????n (n???u c??)',
               type: 'textarea'
            },
            {
               label: 'S??? ti???n ???? thanh to??n (VN??)',
               propForValue: 'daThanhToan',
               placeholder: 'Nh???p s??? ti???n ???? thanh to??n',
               type: 'input',
               validators: [
                  {
                     rule: 'isNumeric',
                     message:
                        'S??? ti???n ???? thanh to??n ch??? ???????c bao g???m c??c ch??? s??? (0-9)!'
                  },
                  {
                     rule: 'notEmpty',
                     message:
                        'S??? ti???n ???? thanh to??n l?? th??ng tin b???t bu???c v?? kh??ng ???????c ????? tr???ng!'
                  }
               ]
            }
         ],
         details: {
            entity: chiTietHoaDonDichVu,
            api: apiRoutes.chiTietHoaDonDichVu,
            propNameForKey: ['soHDDV, maDichVu'],
            propNameForParentKey: 'soHDDV',
            columns: [
               {
                  label: 'D???ch v???',
                  propForValue: 'maDichVu',
                  type: 'select',
                  values: getAllServices(),
                  propForItemValue: 'value',
                  propForItemText: 'label',
                  affectedProps: ['donGia', 'thanhTien']
               },
               {
                  label: '????n gi?? (VN??)',
                  propForValue: 'donGia',
                  placeholder: 'Nh???p ????n gi?? c???a d???ch v???',
                  prefetch: {
                     values: services,
                     reference: 'maDichVu',
                     propForValue: 'donGia'
                  },
                  type: 'input',
                  validators: [
                     {
                        rule: 'isNumeric',
                        message:
                           '????n gi?? c???a d???ch v??? ch??? ???????c bao g???m c??c ch??? s??? (0-9)!'
                     },
                     {
                        rule: 'notEmpty',
                        message:
                           '????n gi?? c???a d???ch v??? l?? th??ng tin b???t bu???c v?? kh??ng ???????c ????? tr???ng!'
                     }
                  ],
                  disabled: true
               },
               {
                  label: 'S??? l?????ng',
                  propForValue: 'soLuong',
                  placeholder: 'Nh???p s??? l?????ng d???ch v???',
                  type: 'input',
                  validators: [
                     {
                        rule: 'isNumeric',
                        message:
                           'S??? l?????ng d???ch v??? ch??? ???????c bao g???m c??c ch??? s??? (0-9)!'
                     }
                  ],
                  affectedProps: ['thanhTien']
               },
               {
                  label: 'Th??nh ti???n (VN??)',
                  type: 'calculation',
                  operator: '*',
                  propForValue: 'thanhTien',
                  propForValue1: 'soLuong',
                  propForValue2: 'donGia',
                  disabled: true
               }
            ]
         }
      }

      return <ForUpdatePage settings={settings} />
   }

   render() {
      const { renderComponent } = this

      return renderComponent()
   }
}

export default HoaDonDichVuForUpdate
