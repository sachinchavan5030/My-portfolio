import multer, { diskStorage } from "multer";

export const profileUpload = multer({ storage: diskStorage({}) }).single("profile")
export const resumeUpload = multer({ storage: diskStorage({}) }).single("resume")
export const projectUpload = multer({ storage: diskStorage({}) }).single("project")