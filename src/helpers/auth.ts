import usersData from "@/data/users.json";

export const onLogin = (correo: string, password: string) => {
  const user = usersData.users.find(
    (user) => user.correo === correo && user.password === password
  );

  if (user) {
    localStorage.setItem("vl__correo", user.correo);
    localStorage.setItem("vl__role", user.role);
    localStorage.setItem("vl__name", user.name);
    localStorage.setItem("vl__lastName", user.lastName);
    localStorage.setItem("vl__phone", user.phone);
    localStorage.setItem("vl__address", user.address);
    localStorage.setItem("vl__numberDoc", user.numberDoc);
    localStorage.setItem("vl__numberChildren", user.numberChildren);

    return true;
  } else {
    alert("Las credenciales no existen");
    return false;
  }
};

export const onLogout = () => {
  localStorage.removeItem("vl__correo");
  localStorage.removeItem("vl__role");
  localStorage.removeItem("vl__name");
  localStorage.removeItem("vl__lastName");
  localStorage.removeItem("vl__phone");
  localStorage.removeItem("vl__address");
  localStorage.removeItem("vl__numberDoc");
  localStorage.removeItem("vl__numberChildren");
  return true;
};

export const onRegister = (payload: any) => {
  if (!payload.correo && !payload.password) {
    alert("Ingresar correo y/o password");
    return;
  }

  const user = usersData.users.find(
    (user) =>
      user.correo === payload.correo && user.password === payload.password
  );

  if (!user) {
    localStorage.setItem("vl__correo", payload.correo);
    localStorage.setItem("vl__role", payload.role);
    localStorage.setItem("vl__name", payload.name);
    localStorage.setItem("vl__lastName", payload.lastname);
    localStorage.setItem("vl__phone", payload.phone);
    localStorage.setItem("vl__address", payload.address);
    localStorage.setItem("vl__numberDoc", payload.docNumber);
    localStorage.setItem("vl__numberChildren", payload.childrenAmount);

    return true;
  } else {
    alert("El usuario ya existe");
    return false;
  }
};
