import { createContext, useContext } from "react";

/**
 * true khi một khối đang được vẽ trong lớp đo kích thước ẩn (để chia trang).
 * Ở chế độ này các khối không được gây hiệu ứng phụ (ghi lịch sử, dừng âm thanh, id trùng…).
 */
export const MeasureCtx = createContext(false);
export const useMeasuring = () => useContext(MeasureCtx);
