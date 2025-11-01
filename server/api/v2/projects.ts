import { readdirSync } from "fs";
import { join } from "path";

export default defineEventHandler(() => {
  const projects = [
    {
      id: 1,
      title:
        "Blockchain-based Work Management & Internal Communication (Admin Dashboard)",
      desc: "Thiết kế & code các microservice cốt lõi (auth, task, real-time comm) trên NestJS; tối ưu schema + indexing để cải thiện tốc độ truy vấn; dùng Redis cho cache + hàng đợi async để hạ latency; xây WebSocket APIs realtime cho cập nhật nhiệm vụ/cộng tác; lập lịch background tasks & cơ chế xử lý lỗi dài hạn; viết test unit/integration với Jest để đảm bảo độ ổn định; nghiên cứu & áp dụng mô hình mã hoá đầu-cuối cho kênh nội bộ, đánh giá IPFS/AES/RSA về hiệu năng/khả năng mở rộng; biên soạn tài liệu kỹ thuật & cấu hình triển khai.",
      duration: "10 months +",
      author: "Scott Le",
      rating: 4.8,
      tags: [
        "NestJS",
        "PostgreSQL",
        "Redis",
        "WebSockets",
        "Jest",
        "Docker",
        "E2E Encryption",
        "IPFS",
      ],
      thumbnail_image: "/projects/globalchain_admin_dashboard.png",
    },
    {
      id: 2,
      title:
        "Blockchain-based Work Management & Internal Communication (Mobile App)",
      desc: "Thiết kế & code các microservice cốt lõi (auth, task, real-time comm) trên NestJS; tối ưu schema + indexing để cải thiện tốc độ truy vấn; dùng Redis cho cache + hàng đợi async để hạ latency; xây WebSocket APIs realtime cho cập nhật nhiệm vụ/cộng tác; lập lịch background tasks & cơ chế xử lý lỗi dài hạn; viết test unit/integration với Jest để đảm bảo độ ổn định; nghiên cứu & áp dụng mô hình mã hoá đầu-cuối cho kênh nội bộ, đánh giá IPFS/AES/RSA về hiệu năng/khả năng mở rộng; biên soạn tài liệu kỹ thuật & cấu hình triển khai.",
      duration: "10 months +",
      author: "Scott Le",
      rating: 4.8,
      tags: [
        "NestJS",
        "PostgreSQL",
        "Redis",
        "WebSockets",
        "Jest",
        "Docker",
        "E2E Encryption",
        "IPFS",
      ],
      thumbnail_image: "/projects/globalchain_mobile.png",
    },
    {
      id: 3,
      title: "GoCamping.vn – Social Platform",
      desc: "Phát triển backend Spring Boot theo DDD: phân ranh giới domain, thiết kế ERD, chuẩn hoá schema; hiện thực bảo mật API & uỷ quyền; viết endpoints cho đặt chỗ campsite, blog, cộng đồng; chuẩn OpenAPI/Swagger; tách lớp application/service/repository, thêm unit tests cho nghiệp vụ chính; chuẩn bị hook CI để build/test và kế hoạch triển khai. Dữ liệu & truy cập được tổ chức để sẵn sàng scale tính năng booking và nội dung.",
      duration: "8 months+",
      author: "Scott Le",
      rating: 4.8,
      tags: ["Spring Boot", "DDD", "REST API", "ERD", "Auth", "Swagger"],
      thumbnail_image: "/projects/gocamping.png",
    },
    {
      id: 4,
      title: "CRM & CMS Platform (Victoria International Schools)",
      desc: "Thiết kế & triển khai module CRM/CMS theo hướng microservices: làm việc với Tech Lead để vẽ ERD, viết migration, tối ưu index/validation; áp dụng in-memory caching để giảm tải DB ~50% và giảm I/O latency; xây BFF bọc legacy APIs ổn định cho mobile; triển khai RBAC và workflow Email/SMS marketing; tiêu chuẩn hoá ~30% component Vue (Quasar/Pinia) và tối ưu gọi API đa service; hỗ trợ DevOps thu thập log, theo dõi containers, cải tiến CI/CD bằng Jenkins; phát triển batch handlers cho gửi đồng bộ và AWS SES. Kết quả: giảm overhead phối hợp ~50% và thông suốt pipeline build/deploy.",
      duration: "5 months+",
      author: "Scott Le",
      rating: 4.8,
      tags: [
        "Vue",
        "Quasar",
        "Pinia",
        "Django",
        "FastAPI",
        "PostgreSQL",
        "Redis",
        "AWS",
        "Jenkins",
        "BFF",
        "RBAC",
      ],
      thumbnail_image: "/projects/vss_crm.png",
    },
  ];

  const projects_with_images = projects.map((p) => {
    const folderPath = join(
      process.cwd(),
      "public",
      "my-projects",
      String(p.id)
    );
    let images: string[] = [];
    try {
      images = readdirSync(folderPath)
        .filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f))
        .map((f) => `/my-projects/${p.id}/${f}`); // 👉 public path
    } catch {
      images = [];
    }
    return { ...p, images };
  });

  return projects_with_images;
});
