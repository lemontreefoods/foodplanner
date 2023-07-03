const apiUrl = (path: string) =>
  `${process.env["NEXT_PUBLIC_LEMONTREE_PLATFORM_ORIGIN"]}/api/${path}`;
export default apiUrl;
