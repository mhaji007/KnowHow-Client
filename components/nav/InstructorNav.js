import { useState, useEffect } from "react";
import Link from "next/link";

const InstructorNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    typeof window !== "undefined" && setCurrent(window.location.pathname);
  }, [typeof window !== "undefined" && window.location.pathname]);

  return (
    <div className="nav flex-column nav-pills">
      <Link
        className={`nav-link ${current === "/instructor" && "active"}`}
        href="/instructor"
      >
        Dashboard
      </Link>
      <Link
        className={`nav-link ${
          current === "/instructor/course/create" && "active"
        }`}
        href="/instructor/course/create"
      >
        Course Create
      </Link>
    </div>
  );
};

export default InstructorNav;
