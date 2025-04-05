import { PrismaClient, HinhThucSuKien } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Tạo Roles
  const adminRole = await prisma.role.create({
    data: {
      name: 'Admin',
      description: 'Quản trị viên hệ thống',
      status: 1
    }
  })

  const userRole = await prisma.role.create({
    data: {
      name: 'User',
      description: 'Người dùng thông thường',
      status: 1
    }
  })

  // Tạo Users
  const _adminUser = await prisma.user.create({
    data: {
      lastName: 'Admin',
      firstName: 'System',
      username: 'admin',
      email: 'admin@hub.edu.vn',
      passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LHd/UQTtxHR7AGhM2', // Hash của 'admin123'
      status: 1,
      type: 'admin',
      rolesUsers: {
        create: {
          roleId: adminRole.id
        }
      }
    }
  })

  // Tạo LoaiNguoiDung
  const loaiSinhVien = await prisma.loaiNguoiDung.create({
    data: {
      tenLoai: 'Sinh viên',
      moTa: 'Sinh viên đang theo học tại trường',
      status: 1
    }
  })

  const loaiGiangVien = await prisma.loaiNguoiDung.create({
    data: {
      tenLoai: 'Giảng viên',
      moTa: 'Giảng viên của trường',
      status: 1
    }
  })

  const loaiKhach = await prisma.loaiNguoiDung.create({
    data: {
      tenLoai: 'Khách',
      moTa: 'Khách tham dự sự kiện',
      status: 1
    }
  })

  // Tạo PhongKhoa
  const phongDaoTao = await prisma.phongKhoa.create({
    data: {
      maPhongKhoa: 'PDT',
      tenPhongKhoa: 'Phòng Đào tạo',
      status: 1
    }
  })

  const khoaCNTT = await prisma.phongKhoa.create({
    data: {
      maPhongKhoa: 'CNTT',
      tenPhongKhoa: 'Khoa Công nghệ thông tin',
      status: 1
    }
  })

  const khoaKTTC = await prisma.phongKhoa.create({
    data: {
      maPhongKhoa: 'KTTC',
      tenPhongKhoa: 'Khoa Kế toán - Tài chính',
      status: 1
    }
  })

  const khoaQLKD = await prisma.phongKhoa.create({
    data: {
      maPhongKhoa: 'QLKD',
      tenPhongKhoa: 'Khoa Quản lý kinh doanh',
      status: 1
    }
  })

  // Tạo NamHoc
  const namHoc = await prisma.namHoc.create({
    data: {
      tenNamHoc: '2023-2024',
      ngayBatDau: new Date('2023-08-01'),
      ngayKetThuc: new Date('2024-07-31'),
      status: 1
    }
  })

  // Tạo BacHoc
  const bacDaiHoc = await prisma.bacHoc.create({
    data: {
      tenBacHoc: 'Đại học',
      maBacHoc: 'DH',
      status: 1
    }
  })

  // Tạo HeDaoTao
  const heChinhQuy = await prisma.heDaoTao.create({
    data: {
      tenHeDaoTao: 'Chính quy',
      maHeDaoTao: 'CQ',
      status: 1
    }
  })

  // Tạo Nganh
  const nganhCNTT = await prisma.nganh.create({
    data: {
      tenNganh: 'Công nghệ thông tin',
      maNganh: '7480201',
      phongKhoaId: khoaCNTT.id,
      status: 1
    }
  })

  const nganhKTTC = await prisma.nganh.create({
    data: {
      tenNganh: 'Kế toán',
      maNganh: '7340301',
      phongKhoaId: khoaKTTC.id,
      status: 1
    }
  })

  // Tạo Camera
  const camera1 = await prisma.camera.create({
    data: {
      tenCamera: 'Camera Hội trường A',
      maCamera: 'CAM001',
      ipCamera: '192.168.1.100',
      port: 8080,
      username: 'admin',
      password: 'admin123',
      status: 1
    }
  })

  // Tạo Template
  const template1 = await prisma.template.create({
    data: {
      tenTemplate: 'Template Sự kiện cơ bản',
      maTemplate: 'TPL001',
      status: 1
    }
  })

  // Tạo ManHinh
  const manHinh1 = await prisma.manHinh.create({
    data: {
      tenManHinh: 'Màn hình Hội trường A',
      maManHinh: 'MH001',
      cameraId: camera1.id,
      templateId: template1.id,
      status: 1
    }
  })

  // Tạo LoaiSuKien
  const loaiHoiThao = await prisma.loaiSuKien.create({
    data: {
      tenLoaiSuKien: 'Hội thảo',
      maLoaiSuKien: 'HT',
      status: 1
    }
  })

  const loaiSeminar = await prisma.loaiSuKien.create({
    data: {
      tenLoaiSuKien: 'Seminar',
      maLoaiSuKien: 'SM',
      status: 1
    }
  })

  // Tạo DienGia
  const dienGia1 = await prisma.dienGia.create({
    data: {
      tenDienGia: 'TS. Nguyễn Văn A',
      chucDanh: 'Giảng viên cao cấp',
      toChuc: 'Đại học Ngân hàng TP.HCM',
      email: 'nguyenvana@hub.edu.vn',
      dienThoai: '0123456789',
      status: 1
    }
  })

  const dienGia2 = await prisma.dienGia.create({
    data: {
      tenDienGia: 'PGS.TS. Trần Thị B',
      chucDanh: 'Trưởng khoa CNTT',
      toChuc: 'Đại học Ngân hàng TP.HCM',
      email: 'tranthib@hub.edu.vn',
      dienThoai: '0987654321',
      status: 1
    }
  })

  // Tạo các sự kiện
  const suKien1 = await prisma.suKien.create({
    data: {
      tenSuKien: 'Hội thảo: Công nghệ Blockchain trong Ngân hàng',
      moTa: 'Hội thảo về ứng dụng công nghệ Blockchain trong lĩnh vực Ngân hàng',
      thoiGianBatDau: new Date('2024-04-01T08:00:00Z'),
      thoiGianKetThuc: new Date('2024-04-01T12:00:00Z'),
      donViToChuc: 'Khoa Công nghệ thông tin',
      diaDiem: 'Hội trường A',
      loaiSuKienId: loaiHoiThao.id,
      hinhThuc: HinhThucSuKien.offline,
      status: 1
    }
  })

  const suKien2 = await prisma.suKien.create({
    data: {
      tenSuKien: 'Seminar: Trí tuệ nhân tạo trong Tài chính',
      moTa: 'Seminar về ứng dụng AI trong lĩnh vực Tài chính',
      thoiGianBatDau: new Date('2024-04-15T14:00:00Z'),
      thoiGianKetThuc: new Date('2024-04-15T17:00:00Z'),
      donViToChuc: 'Khoa Công nghệ thông tin',
      diaDiem: 'Phòng họp 201',
      loaiSuKienId: loaiSeminar.id,
      hinhThuc: HinhThucSuKien.hybrid,
      status: 1
    }
  })

  // Thêm 8 sự kiện khác
  const suKienList = await Promise.all([
    prisma.suKien.create({
      data: {
        tenSuKien: 'Workshop: Kỹ năng mềm cho sinh viên IT',
        moTa: 'Workshop đào tạo kỹ năng mềm cho sinh viên CNTT',
        thoiGianBatDau: new Date('2024-05-01T08:00:00Z'),
        thoiGianKetThuc: new Date('2024-05-01T12:00:00Z'),
        donViToChuc: 'Khoa Công nghệ thông tin',
        diaDiem: 'Phòng lab 301',
        loaiSuKienId: loaiHoiThao.id,
        hinhThuc: HinhThucSuKien.offline,
        status: 1
      }
    }),
    prisma.suKien.create({
      data: {
        tenSuKien: 'Tọa đàm: Cơ hội việc làm ngành CNTT',
        moTa: 'Tọa đàm về cơ hội việc làm cho sinh viên CNTT',
        thoiGianBatDau: new Date('2024-05-15T14:00:00Z'),
        thoiGianKetThuc: new Date('2024-05-15T17:00:00Z'),
        donViToChuc: 'Phòng Công tác sinh viên',
        diaDiem: 'Hội trường B',
        loaiSuKienId: loaiSeminar.id,
        hinhThuc: HinhThucSuKien.hybrid,
        status: 1
      }
    }),
    // Thêm các sự kiện khác tương tự
  ])

  // Tạo tài khoản sinh viên
  const sinhVien = await prisma.nguoiDung.create({
    data: {
      accountId: 'thanph',
      firstName: 'Thân',
      fullName: 'Phạm Hoàng Thân',
      email: 'thanph@hub.edu.vn',
      mobilePhone: '0123456789',
      loaiNguoiDungId: loaiSinhVien.id,
      namHocId: namHoc.id,
      bacHocId: bacDaiHoc.id,
      heDaoTaoId: heChinhQuy.id,
      nganhId: nganhCNTT.id,
      phongKhoaId: khoaCNTT.id,
      status: 1
    }
  })

  // Tạo tài khoản khách
  const khach = await prisma.nguoiDung.create({
    data: {
      accountId: 'thangph2146',
      firstName: 'Thắng',
      fullName: 'Phạm Hoàng Thắng',
      email: 'thang.ph2146@gmail.com',
      mobilePhone: '0987654321',
      loaiNguoiDungId: loaiKhach.id,
      status: 1
    }
  })

  // Tạo thêm một số sinh viên khác
  const sinhVienList = await Promise.all([
    prisma.nguoiDung.create({
      data: {
        accountId: 'sv001',
        firstName: 'Nam',
        fullName: 'Nguyễn Văn Nam',
        email: 'namnv@hub.edu.vn',
        mobilePhone: '0123456790',
        loaiNguoiDungId: loaiSinhVien.id,
        namHocId: namHoc.id,
        bacHocId: bacDaiHoc.id,
        heDaoTaoId: heChinhQuy.id,
        nganhId: nganhCNTT.id,
        phongKhoaId: khoaCNTT.id,
        status: 1
      }
    }),
    prisma.nguoiDung.create({
      data: {
        accountId: 'sv002',
        firstName: 'Hoa',
        fullName: 'Trần Thị Hoa',
        email: 'hoatt@hub.edu.vn',
        mobilePhone: '0123456791',
        loaiNguoiDungId: loaiSinhVien.id,
        namHocId: namHoc.id,
        bacHocId: bacDaiHoc.id,
        heDaoTaoId: heChinhQuy.id,
        nganhId: nganhKTTC.id,
        phongKhoaId: khoaKTTC.id,
        status: 1
      }
    })
  ])

  // Tạo đăng ký sự kiện
  await prisma.dangKySuKien.create({
    data: {
      suKienId: suKien1.id,
      email: sinhVien.email || '',
      hoTen: sinhVien.fullName || '',
      dienThoai: sinhVien.mobilePhone || '',
      status: 1,
      hinhThucThamGia: 'offline'
    }
  })

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 