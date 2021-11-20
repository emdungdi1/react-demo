import TrangChu from './../component/Page/TrangChu/index';
import NotFound from './../component/Page/notFound/index';
import HuongDanMuaHang from './../component/Page/HuongDanMuaHang/index';
import DoiTra from '../component/Page/DoiTra/index';
import TraCuuDonHang from './../component/Page/TraCuuDonHang/index';
import BaoHanh from './../component/Page/BaoHanh/index';
import ThanhToan from './../component/Page/ThanhToan/index';
import VanChuyen from './../component/Page/VanChuyen/index';
import TaiKhoan from './../component/Page/TaiKhoan/index';
import ThuongHieuTC from './../component/Page/ThuongHieuTC/index';
import SanPhamMoi from './../component/Page/SanPhamMoi/index';
import DangNhap from './../component/Page/DangNhap/index';
import XemSanPham from './../component/Page/XemSanPham/index';
import DatHang from './../component/Page/Dathang/index';
export const API_ENPOINT = 'https://nhatdoan.herokuapp.com';

export const ROUTESDH = [{
    path: '/DatHang',
    exact: true,
    component: DatHang,
}, ];

export const ROUTESSTC = [{
        path: '/',
        exact: true,
        component: TrangChu,
    },

    {
        path: '/ThuongHieu=:th&&SortBy=:SortBy&&GroupBy=:GroupBy&&Page=:page',
        exact: false,
        component: ThuongHieuTC,
    },
    {
        path: '/ThuongHieu=:th',

        exact: false,
        component: ThuongHieuTC,
    },
    {
        path: '/SanPhamMoi/SortBy=:SortBy&&GroupBy=:GroupBy&&Page=:page',

        exact: false,
        component: SanPhamMoi,
    },
    {
        path: '/SanPhamMoi',

        exact: false,
        component: SanPhamMoi,
    },
    {
        path: '/GioiThieu',

        exact: false,
        component: TaiKhoan,
    },
    {
        path: '/DangKy',

        exact: false,
        component: TaiKhoan,
    },
    {
        path: '/DangNhap',

        exact: false,
        component: DangNhap,
    },
    {
        path: '/HuongDanMuaHang',
        exact: false,
        component: HuongDanMuaHang,
    },
    {
        path: '/TraCuuDonHang',
        exact: false,
        component: TraCuuDonHang,
    },
    {
        path: '/ChinhSachDoiHang',
        exact: false,
        component: DoiTra,
    },
    {
        path: '/ChinhSachBaoHanh',
        exact: false,
        component: BaoHanh,
    },
    {
        path: '/ChinhSachThanhToan',
        exact: false,
        component: ThanhToan,
    },
    {
        path: '/HinhThucVanChuyen',
        exact: false,
        component: VanChuyen,
    },

    {
        path: '/XemSamPham/:th',
        exact: false,
        component: XemSanPham,
    },
    {
        path: '*',
        name: 'Not Found',
        component: NotFound,
    },
];

export const ROUTESSMN = [{
        path: '/',
        name: 'Trang chủ',
        exact: true,
    },

    {
        path: '/GiayTay',
        name: 'Giày Tây',
        exact: false,
    },
    {
        path: '/GioiThieu',
        name: 'Giới Thiệu',
        exact: false,
    },
    {
        path: '/DangNhap',
        name: 'Đăng nhập',
        exact: false,
    },
    {
        path: '/DangKy',
        name: 'Đăng ký',
        exact: false,
    },

    {
        path: '*',
        name: 'Not Found',
        component: NotFound,
    },
];