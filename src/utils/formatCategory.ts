export const formatCategoryName = (name: string) => {
  if (!name) return "";
  return name.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};
