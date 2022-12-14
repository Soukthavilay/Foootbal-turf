import React, { Component } from 'react'
import ForUpdatePage from '../../components/ForUpdateWithListPage'
import { donNhapHang, chiTietDonNhapHang } from '../../entities'
import apiRoutes from '../../routes/apis'
import { apiGet } from '../../utils'

class DonNhapHangForUpdate extends Component {
   constructor(props) {
      super(props)

      this.state = {
         providers: [],
         employees: [],
         assets: []
      }
   }

   ////// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      const { fetchData } = this

      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchData = () => {
      const { fetchProviders, fetchEmployees, fetchAssets } = this

      fetchProviders()
      fetchEmployees()
      fetchAssets()
   }

   fetchProviders = async () => {
      const url = apiRoutes.nhaCungCap.getAll
      const queries = { pageSize: 1000 }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ providers: data })
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

   fetchAssets = async () => {
      const url = apiRoutes.taiSanThietBi.getAll
      const queries = { pageSize: 1000 }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ assets: data })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   ///// METHODS FOR COMPUTING VALUES /////

   getAllProviders = () => {
      const { providers } = this.state
      let allProviders = []

      providers.forEach(provider => {
         allProviders.push({
            value: provider['maNhaCungCap'],
            label: provider['tenNhaCungCap']
         })
      })

      return allProviders
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

   getAllAssets = () => {
      const { assets } = this.state
      let allAssets = []

      assets.forEach(asset => {
         allAssets.push({
            value: asset['maTSTB'],
            label: asset['tenTSTB']
         })
      })

      return allAssets
   }

   ////// METHODS FOR REACT LIFECYCLES /////

   componentDidMount() {
      const { fetchData } = this

      fetchData()
   }

   ///// METHODS FOR INTERACTING WITH API /////

   fetchData = () => {
      const { fetchAssets } = this

      fetchAssets()
   }

   fetchAssets = async () => {
      const url = apiRoutes.taiSanThietBi.getAll
      const queries = { pageSize: 1000 }

      try {
         const response = await apiGet(url, queries)

         if (response && response.data.status === 'SUCCESS') {
            const { data } = response.data.result

            this.setState({ assets: data })
         } else {
            throw new Error(response.errors)
         }
      } catch (error) {
         console.error(error)
      }
   }

   ///// METHODS FOR COMPUTING VALUES /////

   getAllAssets = () => {
      const { assets } = this.state
      let allAssets = []

      assets.forEach(asset => {
         allAssets.push({
            value: asset['maTSTB'],
            label: asset['tenTSTB']
         })
      })

      return allAssets
   }

   ///// METHODS FOR RENDERING UI /////

   renderComponent = () => {
      const { getAllProviders, getAllEmployees, getAllAssets } = this

      const settings = {
         entity: donNhapHang,
         api: apiRoutes.donNhapHang,
         fields: [
            {
               label: 'Nh?? cung c???p',
               propForValue: 'maNhaCungCap',
               type: 'select',
               values: getAllProviders(),
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
               label: 'Ng??y giao h??ng',
               propForValue: 'ngayGiaoHang',
               placeholder: 'Nh???p ng??y giao h??ng',
               type: 'date',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Ng??y giao h??ng l?? th??ng tin b???t bu???c v?? kh??ng ???????c ????? tr???ng!'
                  }
               ]
            },
            {
               label: 'Ng??y l???p ????n',
               propForValue: 'ngayLap',
               placeholder: 'Nh???p ng??y l???p ????n',
               type: 'date',
               validators: [
                  {
                     rule: 'notEmpty',
                     message:
                        'Ng??y l???p ????n l?? th??ng tin b???t bu???c v?? kh??ng ???????c ????? tr???ng!'
                  }
               ]
            },
            {
               label: 'Ghi ch??',
               propForValue: 'ghiChu',
               placeholder: 'Nh???p ghi ch?? v??? ????n nh???p h??ng (n???u c??)',
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
            entity: chiTietDonNhapHang,
            api: apiRoutes.chiTietDonNhapHang,
            propNameForKey: ['maDonNhapHang, maTSTB'],
            propNameForParentKey: 'maDonNhapHang',
            columns: [
               {
                  label: 'T??i s???n thi???t b???',
                  propForValue: 'maTSTB',
                  type: 'select',
                  values: getAllAssets(),
                  propForItemValue: 'value',
                  propForItemText: 'label',
                  affectedProps: ['donGia', 'thanhTien']
               },
               {
                  label: '????n gi??',
                  propForValue: 'donGia',
                  placeholder: 'Nh???p ????n gi?? c???a t??i s???n thi???t b???',
                  type: 'input',
                  validators: [
                     {
                        rule: 'isNumeric',
                        message:
                           '????n gi?? c???a t??i s???n thi???t b??? ch??? ???????c bao g???m c??c ch??? s??? (0-9)!'
                     },
                     {
                        rule: 'notEmpty',
                        message:
                           '????n gi?? c???a t??i s???n thi???t b??? l?? th??ng tin b???t bu???c v?? kh??ng ???????c ????? tr???ng!'
                     }
                  ],
                  affectedProps: ['thanhTien']
               },
               {
                  label: '????n v??? t??nh',
                  propForValue: 'dvt',
                  placeholder: 'Nh???p ????n v??? t??nh c???a t??i s???n thi???t b???',
                  type: 'input',
                  validators: [
                     {
                        rule: 'notEmpty',
                        message:
                           '????n v??? t??nh c???a t??i s???n thi???t b??? l?? th??ng tin b???t bu???c v?? kh??ng ???????c ????? tr???ng!'
                     }
                  ]
               },
               {
                  label: 'S??? l?????ng',
                  propForValue: 'soLuong',
                  placeholder: 'Nh???p s??? l?????ng t??i s???n thi???t b???',
                  type: 'input',
                  validators: [
                     {
                        rule: 'isNumeric',
                        message:
                           'S??? l?????ng t??i s???n thi???t b??? ch??? ???????c bao g???m c??c ch??? s??? (0-9)!'
                     }
                  ],
                  affectedProps: ['thanhTien']
               },
               {
                  label: 'Th??nh ti???n',
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

export default DonNhapHangForUpdate
