import fs from "fs";
import path from "path";

export async function saveData({ data, weekday }) {
  try {
    const db = await loadData();
    const newData = { ...db, [weekday]: data };
    await fs.promises.writeFile(
      path.join(process.cwd(), "db.json"),
      JSON.stringify(newData, null, 2),
      "utf-8",
    );
    console.log("Data saved to data.json");
  } catch (error) {
    console.error("Error saving data:", error);
  }
}

export async function loadData() {
  try {
    const data = await fs.promises.readFile(
      path.join(process.cwd(), "db.json"),
      "utf8",
    );
    return JSON.parse(data);
  } catch (error) {
    console.error("Error loading data:", error);
    return null;
  }
}
