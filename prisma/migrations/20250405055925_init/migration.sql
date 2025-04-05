-- CreateEnum
CREATE TYPE "HinhThucSuKien" AS ENUM ('offline', 'online', 'hybrid');

-- CreateEnum
CREATE TYPE "TrangThaiThamGia" AS ENUM ('xac_nhan', 'cho_xac_nhan', 'tu_choi', 'khong_lien_he_duoc');

-- CreateEnum
CREATE TYPE "CheckinType" AS ENUM ('face_id', 'manual', 'qr_code', 'online');

-- CreateEnum
CREATE TYPE "HinhThucThamGia" AS ENUM ('offline', 'online');

-- CreateEnum
CREATE TYPE "CheckoutType" AS ENUM ('face_id', 'manual', 'qr_code', 'auto', 'online');

-- CreateEnum
CREATE TYPE "LoaiNguoiDangKy" AS ENUM ('khach', 'sinh_vien', 'giang_vien');

-- CreateEnum
CREATE TYPE "HinhThucDangKy" AS ENUM ('offline', 'online', 'hybrid');

-- CreateEnum
CREATE TYPE "AttendanceStatus" AS ENUM ('not_attended', 'partial', 'full');

-- CreateEnum
CREATE TYPE "DiemDanhBang" AS ENUM ('qr_code', 'face_id', 'manual', 'none');

-- CreateTable
CREATE TABLE "users" (
    "u_id" SERIAL NOT NULL,
    "u_LastName" VARCHAR(50),
    "u_MiddleName" VARCHAR(50),
    "u_FirstName" VARCHAR(50),
    "u_type" VARCHAR(50),
    "u_username" VARCHAR(50) NOT NULL,
    "u_email" VARCHAR(255) NOT NULL,
    "u_password_hash" VARCHAR(255),
    "u_status" INTEGER DEFAULT 1,
    "u_created_at" TIMESTAMP(3),
    "u_updated_at" TIMESTAMP(3),
    "u_deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("u_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "r_id" SERIAL NOT NULL,
    "r_name" VARCHAR(128),
    "r_description" TEXT,
    "r_status" INTEGER NOT NULL DEFAULT 1,
    "r_created_at" TIMESTAMP(3),
    "r_updated_at" TIMESTAMP(3),
    "r_deleted_at" TIMESTAMP(3),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("r_id")
);

-- CreateTable
CREATE TABLE "roles_users" (
    "ru_id" SERIAL NOT NULL,
    "user_id" INTEGER,
    "role_id" INTEGER,

    CONSTRAINT "roles_users_pkey" PRIMARY KEY ("ru_id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "p_id" SERIAL NOT NULL,
    "p_name" VARCHAR(128),
    "p_display_name" VARCHAR(128),
    "p_description" TEXT,
    "p_status" INTEGER NOT NULL DEFAULT 1,
    "p_created_at" TIMESTAMP(3),
    "p_updated_at" TIMESTAMP(3),
    "p_deleted_at" TIMESTAMP(3),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("p_id")
);

-- CreateTable
CREATE TABLE "permission_roles" (
    "pr_id" SERIAL NOT NULL,
    "role_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,

    CONSTRAINT "permission_roles_pkey" PRIMARY KEY ("pr_id")
);

-- CreateTable
CREATE TABLE "settings" (
    "id" SERIAL NOT NULL,
    "class" VARCHAR(255) NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "value" TEXT,
    "type" VARCHAR(31) NOT NULL DEFAULT 'string',
    "context" VARCHAR(255),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loai_nguoi_dung" (
    "loai_nguoi_dung_id" SERIAL NOT NULL,
    "ten_loai" VARCHAR(50) NOT NULL,
    "mo_ta" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "loai_nguoi_dung_pkey" PRIMARY KEY ("loai_nguoi_dung_id")
);

-- CreateTable
CREATE TABLE "phong_khoa" (
    "phong_khoa_id" SERIAL NOT NULL,
    "ma_phong_khoa" VARCHAR(20) NOT NULL,
    "ten_phong_khoa" VARCHAR(100) NOT NULL,
    "ghi_chu" TEXT,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "phong_khoa_pkey" PRIMARY KEY ("phong_khoa_id")
);

-- CreateTable
CREATE TABLE "nam_hoc" (
    "nam_hoc_id" SERIAL NOT NULL,
    "ten_nam_hoc" VARCHAR(50) NOT NULL,
    "ngay_bat_dau" DATE,
    "ngay_ket_thuc" DATE,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "nam_hoc_pkey" PRIMARY KEY ("nam_hoc_id")
);

-- CreateTable
CREATE TABLE "bac_hoc" (
    "bac_hoc_id" SERIAL NOT NULL,
    "ten_bac_hoc" VARCHAR(100) NOT NULL,
    "ma_bac_hoc" VARCHAR(20),
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "bac_hoc_pkey" PRIMARY KEY ("bac_hoc_id")
);

-- CreateTable
CREATE TABLE "he_dao_tao" (
    "he_dao_tao_id" SERIAL NOT NULL,
    "ten_he_dao_tao" VARCHAR(100) NOT NULL,
    "ma_he_dao_tao" VARCHAR(20),
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "he_dao_tao_pkey" PRIMARY KEY ("he_dao_tao_id")
);

-- CreateTable
CREATE TABLE "khoa_hoc" (
    "khoa_hoc_id" SERIAL NOT NULL,
    "ten_khoa_hoc" VARCHAR(100) NOT NULL,
    "nam_bat_dau" INTEGER,
    "nam_ket_thuc" INTEGER,
    "phong_khoa_id" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "khoa_hoc_pkey" PRIMARY KEY ("khoa_hoc_id")
);

-- CreateTable
CREATE TABLE "nganh" (
    "nganh_id" SERIAL NOT NULL,
    "ten_nganh" VARCHAR(200) NOT NULL,
    "ma_nganh" VARCHAR(20) NOT NULL,
    "phong_khoa_id" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "nganh_pkey" PRIMARY KEY ("nganh_id")
);

-- CreateTable
CREATE TABLE "camera" (
    "camera_id" SERIAL NOT NULL,
    "ten_camera" VARCHAR(255) NOT NULL,
    "ma_camera" VARCHAR(20),
    "ip_camera" VARCHAR(100),
    "port" INTEGER,
    "username" VARCHAR(50),
    "password" VARCHAR(50),
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "camera_pkey" PRIMARY KEY ("camera_id")
);

-- CreateTable
CREATE TABLE "template" (
    "template_id" SERIAL NOT NULL,
    "ten_template" VARCHAR(255) NOT NULL,
    "ma_template" VARCHAR(20),
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "template_pkey" PRIMARY KEY ("template_id")
);

-- CreateTable
CREATE TABLE "man_hinh" (
    "man_hinh_id" SERIAL NOT NULL,
    "ten_man_hinh" VARCHAR(255) NOT NULL,
    "ma_man_hinh" VARCHAR(20),
    "camera_id" INTEGER,
    "template_id" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "man_hinh_pkey" PRIMARY KEY ("man_hinh_id")
);

-- CreateTable
CREATE TABLE "loai_su_kien" (
    "loai_su_kien_id" SERIAL NOT NULL,
    "ten_loai_su_kien" VARCHAR(100) NOT NULL,
    "ma_loai_su_kien" VARCHAR(20),
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "loai_su_kien_pkey" PRIMARY KEY ("loai_su_kien_id")
);

-- CreateTable
CREATE TABLE "su_kien" (
    "su_kien_id" SERIAL NOT NULL,
    "ten_su_kien" VARCHAR(255) NOT NULL,
    "su_kien_poster" JSONB,
    "mo_ta" TEXT,
    "mo_ta_su_kien" TEXT,
    "chi_tiet_su_kien" TEXT,
    "thoi_gian_bat_dau" TIMESTAMP(3) NOT NULL,
    "thoi_gian_ket_thuc" TIMESTAMP(3) NOT NULL,
    "thoi_gian_checkin_bat_dau" TIMESTAMP(3),
    "thoi_gian_checkin_ket_thuc" TIMESTAMP(3),
    "don_vi_to_chuc" VARCHAR(255),
    "don_vi_phoi_hop" TEXT,
    "doi_tuong_tham_gia" TEXT,
    "diaDiem" VARCHAR(255),
    "dia_chi_cu_the" VARCHAR(255),
    "toa_do_gps" VARCHAR(100),
    "loai_su_kien_id" INTEGER NOT NULL,
    "ma_qr_code" VARCHAR(100),
    "status" INTEGER NOT NULL DEFAULT 1,
    "tong_dang_ky" INTEGER NOT NULL DEFAULT 0,
    "tong_check_in" INTEGER NOT NULL DEFAULT 0,
    "tong_check_out" INTEGER NOT NULL DEFAULT 0,
    "cho_phep_check_in" BOOLEAN NOT NULL DEFAULT true,
    "cho_phep_check_out" BOOLEAN NOT NULL DEFAULT true,
    "yeu_cau_face_id" BOOLEAN NOT NULL DEFAULT false,
    "cho_phep_checkin_thu_cong" BOOLEAN NOT NULL DEFAULT true,
    "bat_dau_dang_ky" TIMESTAMP(3),
    "ket_thuc_dang_ky" TIMESTAMP(3),
    "han_huy_dang_ky" TIMESTAMP(3),
    "gio_bat_dau" TIMESTAMP(3),
    "gio_ket_thuc" TIMESTAMP(3),
    "so_luong_tham_gia" INTEGER NOT NULL DEFAULT 0,
    "so_luong_dien_gia" INTEGER NOT NULL DEFAULT 0,
    "gioi_han_loai_nguoi_dung" VARCHAR(255),
    "tu_khoa_su_kien" VARCHAR(255),
    "hashtag" VARCHAR(255),
    "slug" VARCHAR(255),
    "so_luot_xem" INTEGER NOT NULL DEFAULT 0,
    "lich_trinh" JSONB,
    "hinh_thuc" "HinhThucSuKien" NOT NULL DEFAULT 'offline',
    "link_online" VARCHAR(255),
    "mat_khau_online" VARCHAR(100),
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "su_kien_pkey" PRIMARY KEY ("su_kien_id")
);

-- CreateTable
CREATE TABLE "dien_gia" (
    "dien_gia_id" SERIAL NOT NULL,
    "ten_dien_gia" VARCHAR(255) NOT NULL,
    "chuc_danh" VARCHAR(255),
    "to_chuc" VARCHAR(255),
    "gioi_thieu" TEXT,
    "avatar" VARCHAR(255),
    "email" VARCHAR(100),
    "dien_thoai" VARCHAR(20),
    "website" VARCHAR(255),
    "chuyen_mon" TEXT,
    "thanh_tuu" TEXT,
    "mang_xa_hoi" JSONB,
    "status" INTEGER NOT NULL DEFAULT 1,
    "so_su_kien_tham_gia" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "dien_gia_pkey" PRIMARY KEY ("dien_gia_id")
);

-- CreateTable
CREATE TABLE "su_kien_dien_gia" (
    "su_kien_dien_gia_id" SERIAL NOT NULL,
    "su_kien_id" INTEGER NOT NULL,
    "dien_gia_id" INTEGER NOT NULL,
    "thu_tu" INTEGER NOT NULL DEFAULT 0,
    "vai_tro" VARCHAR(100),
    "mo_ta" TEXT,
    "thoi_gian_trinh_bay" TIMESTAMP(3),
    "thoi_gian_ket_thuc" TIMESTAMP(3),
    "thoi_luong_phut" INTEGER,
    "tieu_de_trinh_bay" VARCHAR(255),
    "tai_lieu_dinh_kem" JSONB,
    "trang_thai_tham_gia" "TrangThaiThamGia" NOT NULL DEFAULT 'cho_xac_nhan',
    "hien_thi_cong_khai" BOOLEAN NOT NULL DEFAULT true,
    "ghi_chu" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "su_kien_dien_gia_pkey" PRIMARY KEY ("su_kien_dien_gia_id")
);

-- CreateTable
CREATE TABLE "form_dang_ky_su_kien" (
    "form_id" SERIAL NOT NULL,
    "ten_form" VARCHAR(255) NOT NULL,
    "mo_ta" TEXT,
    "su_kien_id" INTEGER NOT NULL,
    "cau_truc_form" JSONB NOT NULL,
    "hien_thi_cong_khai" BOOLEAN NOT NULL DEFAULT true,
    "bat_buoc_dien" BOOLEAN NOT NULL DEFAULT false,
    "so_lan_su_dung" INTEGER NOT NULL DEFAULT 0,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "form_dang_ky_su_kien_pkey" PRIMARY KEY ("form_id")
);

-- CreateTable
CREATE TABLE "nguoi_dung" (
    "nguoi_dung_id" SERIAL NOT NULL,
    "AccountId" VARCHAR(50),
    "u_id" INTEGER,
    "FirstName" VARCHAR(100),
    "AccountType" VARCHAR(20),
    "FullName" VARCHAR(100),
    "MobilePhone" VARCHAR(20),
    "Email" VARCHAR(100),
    "HomePhone1" VARCHAR(20),
    "PW" VARCHAR(255),
    "HomePhone" VARCHAR(20),
    "loai_nguoi_dung_id" INTEGER,
    "mat_khau_local" VARCHAR(255),
    "nam_hoc_id" INTEGER,
    "bac_hoc_id" INTEGER,
    "he_dao_tao_id" INTEGER,
    "nganh_id" INTEGER,
    "phong_khoa_id" INTEGER,
    "status" INTEGER NOT NULL DEFAULT 1,
    "last_login" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "nguoi_dung_pkey" PRIMARY KEY ("nguoi_dung_id")
);

-- CreateTable
CREATE TABLE "face_nguoi_dung" (
    "face_nguoi_dung_id" SERIAL NOT NULL,
    "nguoi_dung_id" INTEGER NOT NULL,
    "duong_dan_anh" VARCHAR(255) NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "face_nguoi_dung_pkey" PRIMARY KEY ("face_nguoi_dung_id")
);

-- CreateTable
CREATE TABLE "checkin_sukien" (
    "checkin_sukien_id" SERIAL NOT NULL,
    "su_kien_id" INTEGER NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "ho_ten" VARCHAR(255) NOT NULL,
    "dangky_sukien_id" INTEGER,
    "thoi_gian_check_in" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkin_type" "CheckinType" NOT NULL,
    "face_image_path" VARCHAR(255),
    "face_match_score" DOUBLE PRECISION,
    "face_verified" BOOLEAN NOT NULL DEFAULT false,
    "ma_xac_nhan" VARCHAR(20),
    "status" INTEGER NOT NULL DEFAULT 1,
    "location_data" VARCHAR(255),
    "device_info" VARCHAR(255),
    "hinh_thuc_tham_gia" "HinhThucThamGia" NOT NULL DEFAULT 'offline',
    "ip_address" VARCHAR(45),
    "thong_tin_bo_sung" JSONB,
    "ghi_chu" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "checkin_sukien_pkey" PRIMARY KEY ("checkin_sukien_id")
);

-- CreateTable
CREATE TABLE "checkout_sukien" (
    "checkout_sukien_id" SERIAL NOT NULL,
    "su_kien_id" INTEGER NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "ho_ten" VARCHAR(255) NOT NULL,
    "dangky_sukien_id" INTEGER,
    "checkin_sukien_id" INTEGER,
    "thoi_gian_check_out" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checkout_type" "CheckoutType" NOT NULL,
    "face_image_path" VARCHAR(255),
    "face_match_score" DOUBLE PRECISION,
    "face_verified" BOOLEAN NOT NULL DEFAULT false,
    "ma_xac_nhan" VARCHAR(20),
    "status" INTEGER NOT NULL DEFAULT 1,
    "location_data" VARCHAR(255),
    "device_info" VARCHAR(255),
    "attendance_duration_minutes" INTEGER,
    "hinh_thuc_tham_gia" "HinhThucThamGia" NOT NULL DEFAULT 'offline',
    "ip_address" VARCHAR(45),
    "thong_tin_bo_sung" JSONB,
    "ghi_chu" TEXT,
    "feedback" TEXT,
    "danh_gia" INTEGER,
    "noi_dung_danh_gia" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "checkout_sukien_pkey" PRIMARY KEY ("checkout_sukien_id")
);

-- CreateTable
CREATE TABLE "dangky_sukien" (
    "dangky_sukien_id" SERIAL NOT NULL,
    "su_kien_id" INTEGER NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "ho_ten" VARCHAR(255) NOT NULL,
    "dien_thoai" VARCHAR(20),
    "loai_nguoi_dang_ky" "LoaiNguoiDangKy" NOT NULL DEFAULT 'khach',
    "ngay_dang_ky" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "ma_xac_nhan" VARCHAR(20),
    "status" INTEGER NOT NULL DEFAULT 0,
    "noi_dung_gop_y" TEXT,
    "nguon_gioi_thieu" VARCHAR(255),
    "don_vi_to_chuc" VARCHAR(255),
    "face_image_path" VARCHAR(255),
    "face_verified" BOOLEAN NOT NULL DEFAULT false,
    "da_check_in" BOOLEAN NOT NULL DEFAULT false,
    "da_check_out" BOOLEAN NOT NULL DEFAULT false,
    "checkin_sukien_id" INTEGER,
    "checkout_sukien_id" INTEGER,
    "thoi_gian_duyet" TIMESTAMP(3),
    "thoi_gian_huy" TIMESTAMP(3),
    "ly_do_huy" TEXT,
    "hinh_thuc_tham_gia" "HinhThucDangKy" NOT NULL DEFAULT 'offline',
    "attendance_status" "AttendanceStatus" NOT NULL DEFAULT 'not_attended',
    "attendance_minutes" INTEGER NOT NULL DEFAULT 0,
    "diem_danh_bang" "DiemDanhBang" NOT NULL DEFAULT 'none',
    "thong_tin_dang_ky" JSONB,
    "ly_do_tham_du" TEXT,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "dangky_sukien_pkey" PRIMARY KEY ("dangky_sukien_id")
);

-- CreateIndex
CREATE INDEX "loai_nguoi_dung_ten_loai_idx" ON "loai_nguoi_dung"("ten_loai");

-- CreateIndex
CREATE INDEX "phong_khoa_ma_phong_khoa_idx" ON "phong_khoa"("ma_phong_khoa");

-- CreateIndex
CREATE INDEX "phong_khoa_ten_phong_khoa_idx" ON "phong_khoa"("ten_phong_khoa");

-- CreateIndex
CREATE UNIQUE INDEX "phong_khoa_ma_phong_khoa_key" ON "phong_khoa"("ma_phong_khoa");

-- CreateIndex
CREATE INDEX "nam_hoc_ten_nam_hoc_idx" ON "nam_hoc"("ten_nam_hoc");

-- CreateIndex
CREATE UNIQUE INDEX "nam_hoc_ten_nam_hoc_key" ON "nam_hoc"("ten_nam_hoc");

-- CreateIndex
CREATE INDEX "bac_hoc_ten_bac_hoc_idx" ON "bac_hoc"("ten_bac_hoc");

-- CreateIndex
CREATE UNIQUE INDEX "bac_hoc_ten_bac_hoc_key" ON "bac_hoc"("ten_bac_hoc");

-- CreateIndex
CREATE INDEX "he_dao_tao_ten_he_dao_tao_idx" ON "he_dao_tao"("ten_he_dao_tao");

-- CreateIndex
CREATE UNIQUE INDEX "he_dao_tao_ten_he_dao_tao_key" ON "he_dao_tao"("ten_he_dao_tao");

-- CreateIndex
CREATE INDEX "khoa_hoc_ten_khoa_hoc_idx" ON "khoa_hoc"("ten_khoa_hoc");

-- CreateIndex
CREATE INDEX "khoa_hoc_phong_khoa_id_idx" ON "khoa_hoc"("phong_khoa_id");

-- CreateIndex
CREATE INDEX "nganh_ma_nganh_idx" ON "nganh"("ma_nganh");

-- CreateIndex
CREATE INDEX "nganh_ten_nganh_idx" ON "nganh"("ten_nganh");

-- CreateIndex
CREATE INDEX "nganh_phong_khoa_id_idx" ON "nganh"("phong_khoa_id");

-- CreateIndex
CREATE UNIQUE INDEX "nganh_ma_nganh_key" ON "nganh"("ma_nganh");

-- CreateIndex
CREATE INDEX "camera_ten_camera_idx" ON "camera"("ten_camera");

-- CreateIndex
CREATE UNIQUE INDEX "camera_ten_camera_key" ON "camera"("ten_camera");

-- CreateIndex
CREATE INDEX "template_ten_template_idx" ON "template"("ten_template");

-- CreateIndex
CREATE UNIQUE INDEX "template_ten_template_key" ON "template"("ten_template");

-- CreateIndex
CREATE INDEX "man_hinh_ten_man_hinh_idx" ON "man_hinh"("ten_man_hinh");

-- CreateIndex
CREATE INDEX "man_hinh_camera_id_idx" ON "man_hinh"("camera_id");

-- CreateIndex
CREATE INDEX "man_hinh_template_id_idx" ON "man_hinh"("template_id");

-- CreateIndex
CREATE UNIQUE INDEX "man_hinh_ten_man_hinh_key" ON "man_hinh"("ten_man_hinh");

-- CreateIndex
CREATE INDEX "loai_su_kien_ten_loai_su_kien_idx" ON "loai_su_kien"("ten_loai_su_kien");

-- CreateIndex
CREATE UNIQUE INDEX "loai_su_kien_ten_loai_su_kien_key" ON "loai_su_kien"("ten_loai_su_kien");

-- CreateIndex
CREATE INDEX "su_kien_ten_su_kien_idx" ON "su_kien"("ten_su_kien");

-- CreateIndex
CREATE INDEX "su_kien_thoi_gian_bat_dau_idx" ON "su_kien"("thoi_gian_bat_dau");

-- CreateIndex
CREATE INDEX "su_kien_thoi_gian_ket_thuc_idx" ON "su_kien"("thoi_gian_ket_thuc");

-- CreateIndex
CREATE INDEX "su_kien_loai_su_kien_id_idx" ON "su_kien"("loai_su_kien_id");

-- CreateIndex
CREATE INDEX "su_kien_slug_idx" ON "su_kien"("slug");

-- CreateIndex
CREATE INDEX "su_kien_gio_bat_dau_idx" ON "su_kien"("gio_bat_dau");

-- CreateIndex
CREATE INDEX "su_kien_hinh_thuc_idx" ON "su_kien"("hinh_thuc");

-- CreateIndex
CREATE INDEX "su_kien_don_vi_to_chuc_idx" ON "su_kien"("don_vi_to_chuc");

-- CreateIndex
CREATE INDEX "su_kien_thoi_gian_checkin_bat_dau_thoi_gian_checkin_ket_thu_idx" ON "su_kien"("thoi_gian_checkin_bat_dau", "thoi_gian_checkin_ket_thuc");

-- CreateIndex
CREATE INDEX "dien_gia_ten_dien_gia_idx" ON "dien_gia"("ten_dien_gia");

-- CreateIndex
CREATE INDEX "dien_gia_to_chuc_idx" ON "dien_gia"("to_chuc");

-- CreateIndex
CREATE INDEX "dien_gia_email_idx" ON "dien_gia"("email");

-- CreateIndex
CREATE INDEX "su_kien_dien_gia_su_kien_id_idx" ON "su_kien_dien_gia"("su_kien_id");

-- CreateIndex
CREATE INDEX "su_kien_dien_gia_dien_gia_id_idx" ON "su_kien_dien_gia"("dien_gia_id");

-- CreateIndex
CREATE INDEX "su_kien_dien_gia_trang_thai_tham_gia_idx" ON "su_kien_dien_gia"("trang_thai_tham_gia");

-- CreateIndex
CREATE UNIQUE INDEX "su_kien_dien_gia_su_kien_id_dien_gia_id_key" ON "su_kien_dien_gia"("su_kien_id", "dien_gia_id");

-- CreateIndex
CREATE INDEX "form_dang_ky_su_kien_ten_form_idx" ON "form_dang_ky_su_kien"("ten_form");

-- CreateIndex
CREATE INDEX "form_dang_ky_su_kien_su_kien_id_idx" ON "form_dang_ky_su_kien"("su_kien_id");

-- CreateIndex
CREATE INDEX "nguoi_dung_AccountId_idx" ON "nguoi_dung"("AccountId");

-- CreateIndex
CREATE INDEX "nguoi_dung_FullName_idx" ON "nguoi_dung"("FullName");

-- CreateIndex
CREATE INDEX "nguoi_dung_Email_idx" ON "nguoi_dung"("Email");

-- CreateIndex
CREATE INDEX "nguoi_dung_phong_khoa_id_idx" ON "nguoi_dung"("phong_khoa_id");

-- CreateIndex
CREATE INDEX "nguoi_dung_nganh_id_idx" ON "nguoi_dung"("nganh_id");

-- CreateIndex
CREATE INDEX "nguoi_dung_loai_nguoi_dung_id_idx" ON "nguoi_dung"("loai_nguoi_dung_id");

-- CreateIndex
CREATE INDEX "nguoi_dung_bac_hoc_id_idx" ON "nguoi_dung"("bac_hoc_id");

-- CreateIndex
CREATE INDEX "nguoi_dung_he_dao_tao_id_idx" ON "nguoi_dung"("he_dao_tao_id");

-- CreateIndex
CREATE INDEX "nguoi_dung_nam_hoc_id_idx" ON "nguoi_dung"("nam_hoc_id");

-- CreateIndex
CREATE UNIQUE INDEX "nguoi_dung_AccountId_key" ON "nguoi_dung"("AccountId");

-- CreateIndex
CREATE UNIQUE INDEX "nguoi_dung_Email_key" ON "nguoi_dung"("Email");

-- CreateIndex
CREATE INDEX "face_nguoi_dung_nguoi_dung_id_idx" ON "face_nguoi_dung"("nguoi_dung_id");

-- CreateIndex
CREATE INDEX "checkin_sukien_su_kien_id_idx" ON "checkin_sukien"("su_kien_id");

-- CreateIndex
CREATE INDEX "checkin_sukien_email_idx" ON "checkin_sukien"("email");

-- CreateIndex
CREATE INDEX "checkin_sukien_thoi_gian_check_in_idx" ON "checkin_sukien"("thoi_gian_check_in");

-- CreateIndex
CREATE INDEX "checkin_sukien_checkin_type_idx" ON "checkin_sukien"("checkin_type");

-- CreateIndex
CREATE INDEX "checkin_sukien_hinh_thuc_tham_gia_idx" ON "checkin_sukien"("hinh_thuc_tham_gia");

-- CreateIndex
CREATE INDEX "checkout_sukien_su_kien_id_idx" ON "checkout_sukien"("su_kien_id");

-- CreateIndex
CREATE INDEX "checkout_sukien_email_idx" ON "checkout_sukien"("email");

-- CreateIndex
CREATE INDEX "checkout_sukien_checkin_sukien_id_idx" ON "checkout_sukien"("checkin_sukien_id");

-- CreateIndex
CREATE INDEX "checkout_sukien_thoi_gian_check_out_idx" ON "checkout_sukien"("thoi_gian_check_out");

-- CreateIndex
CREATE INDEX "checkout_sukien_checkout_type_idx" ON "checkout_sukien"("checkout_type");

-- CreateIndex
CREATE INDEX "checkout_sukien_hinh_thuc_tham_gia_idx" ON "checkout_sukien"("hinh_thuc_tham_gia");

-- CreateIndex
CREATE INDEX "dangky_sukien_su_kien_id_idx" ON "dangky_sukien"("su_kien_id");

-- CreateIndex
CREATE INDEX "dangky_sukien_email_idx" ON "dangky_sukien"("email");

-- CreateIndex
CREATE INDEX "dangky_sukien_ho_ten_idx" ON "dangky_sukien"("ho_ten");

-- CreateIndex
CREATE INDEX "dangky_sukien_status_idx" ON "dangky_sukien"("status");

-- CreateIndex
CREATE INDEX "dangky_sukien_da_check_in_idx" ON "dangky_sukien"("da_check_in");

-- CreateIndex
CREATE INDEX "dangky_sukien_da_check_out_idx" ON "dangky_sukien"("da_check_out");

-- CreateIndex
CREATE INDEX "dangky_sukien_hinh_thuc_tham_gia_idx" ON "dangky_sukien"("hinh_thuc_tham_gia");

-- CreateIndex
CREATE INDEX "dangky_sukien_checkin_sukien_id_idx" ON "dangky_sukien"("checkin_sukien_id");

-- CreateIndex
CREATE INDEX "dangky_sukien_checkout_sukien_id_idx" ON "dangky_sukien"("checkout_sukien_id");

-- CreateIndex
CREATE UNIQUE INDEX "dangky_sukien_su_kien_id_email_key" ON "dangky_sukien"("su_kien_id", "email");

-- AddForeignKey
ALTER TABLE "roles_users" ADD CONSTRAINT "roles_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("u_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "roles_users" ADD CONSTRAINT "roles_users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("r_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission_roles" ADD CONSTRAINT "permission_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("r_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission_roles" ADD CONSTRAINT "permission_roles_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("p_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "khoa_hoc" ADD CONSTRAINT "khoa_hoc_phong_khoa_id_fkey" FOREIGN KEY ("phong_khoa_id") REFERENCES "phong_khoa"("phong_khoa_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nganh" ADD CONSTRAINT "nganh_phong_khoa_id_fkey" FOREIGN KEY ("phong_khoa_id") REFERENCES "phong_khoa"("phong_khoa_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "man_hinh" ADD CONSTRAINT "man_hinh_camera_id_fkey" FOREIGN KEY ("camera_id") REFERENCES "camera"("camera_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "man_hinh" ADD CONSTRAINT "man_hinh_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "template"("template_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "su_kien" ADD CONSTRAINT "su_kien_loai_su_kien_id_fkey" FOREIGN KEY ("loai_su_kien_id") REFERENCES "loai_su_kien"("loai_su_kien_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "su_kien_dien_gia" ADD CONSTRAINT "su_kien_dien_gia_su_kien_id_fkey" FOREIGN KEY ("su_kien_id") REFERENCES "su_kien"("su_kien_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "su_kien_dien_gia" ADD CONSTRAINT "su_kien_dien_gia_dien_gia_id_fkey" FOREIGN KEY ("dien_gia_id") REFERENCES "dien_gia"("dien_gia_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "form_dang_ky_su_kien" ADD CONSTRAINT "form_dang_ky_su_kien_su_kien_id_fkey" FOREIGN KEY ("su_kien_id") REFERENCES "su_kien"("su_kien_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nguoi_dung" ADD CONSTRAINT "nguoi_dung_loai_nguoi_dung_id_fkey" FOREIGN KEY ("loai_nguoi_dung_id") REFERENCES "loai_nguoi_dung"("loai_nguoi_dung_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nguoi_dung" ADD CONSTRAINT "nguoi_dung_nam_hoc_id_fkey" FOREIGN KEY ("nam_hoc_id") REFERENCES "nam_hoc"("nam_hoc_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nguoi_dung" ADD CONSTRAINT "nguoi_dung_bac_hoc_id_fkey" FOREIGN KEY ("bac_hoc_id") REFERENCES "bac_hoc"("bac_hoc_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nguoi_dung" ADD CONSTRAINT "nguoi_dung_he_dao_tao_id_fkey" FOREIGN KEY ("he_dao_tao_id") REFERENCES "he_dao_tao"("he_dao_tao_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nguoi_dung" ADD CONSTRAINT "nguoi_dung_nganh_id_fkey" FOREIGN KEY ("nganh_id") REFERENCES "nganh"("nganh_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nguoi_dung" ADD CONSTRAINT "nguoi_dung_phong_khoa_id_fkey" FOREIGN KEY ("phong_khoa_id") REFERENCES "phong_khoa"("phong_khoa_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "face_nguoi_dung" ADD CONSTRAINT "face_nguoi_dung_nguoi_dung_id_fkey" FOREIGN KEY ("nguoi_dung_id") REFERENCES "nguoi_dung"("nguoi_dung_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkin_sukien" ADD CONSTRAINT "checkin_sukien_su_kien_id_fkey" FOREIGN KEY ("su_kien_id") REFERENCES "su_kien"("su_kien_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_sukien" ADD CONSTRAINT "checkout_sukien_su_kien_id_fkey" FOREIGN KEY ("su_kien_id") REFERENCES "su_kien"("su_kien_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkout_sukien" ADD CONSTRAINT "checkout_sukien_checkin_sukien_id_fkey" FOREIGN KEY ("checkin_sukien_id") REFERENCES "checkin_sukien"("checkin_sukien_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dangky_sukien" ADD CONSTRAINT "dangky_sukien_su_kien_id_fkey" FOREIGN KEY ("su_kien_id") REFERENCES "su_kien"("su_kien_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dangky_sukien" ADD CONSTRAINT "dangky_sukien_checkin_sukien_id_fkey" FOREIGN KEY ("checkin_sukien_id") REFERENCES "checkin_sukien"("checkin_sukien_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dangky_sukien" ADD CONSTRAINT "dangky_sukien_checkout_sukien_id_fkey" FOREIGN KEY ("checkout_sukien_id") REFERENCES "checkout_sukien"("checkout_sukien_id") ON DELETE SET NULL ON UPDATE CASCADE;
