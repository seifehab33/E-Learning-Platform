import { Course } from "../features/Cart/CartSlice";

interface DemoUser {
  id: string;
  email: string;
  fullName: string;
  password: string;
  purchasedItems?: Course[];
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials extends AuthCredentials {
  fullName: string;
}

const USERS_STORAGE_KEY = "demoUsers";
const CURRENT_USER_STORAGE_KEY = "user";

const demoUserSeed: DemoUser = {
  id: "0",
  fullName: "Demo",
  email: "demo@email.com",
  password: "123456789",
  purchasedItems: [
    {
      id: "1",
      price: "$120",
      img_course: "/assets/ui-course.jpg",
      course: "UI/UX Design",
      discount: "$99",
      hours: "9hr 30min",
      img_inst: "/assets/inst1.jpg",
      job: "Instructor",
      lesson: "12+ lessons",
      name_inst: "Nicole Brown",
      rate: "4.0",
      quantity: 1,
    },
  ],
};

const parseUsers = (value: string | null): DemoUser[] => {
  if (!value) return [];

  try {
    const users = JSON.parse(value);
    return Array.isArray(users) ? users : [];
  } catch {
    return [];
  }
};

const saveUsers = (users: DemoUser[]) => {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const getStoredUsers = (): DemoUser[] => {
  const users = parseUsers(localStorage.getItem(USERS_STORAGE_KEY));
  const hasDemoUser = users.some((user) => user.email === demoUserSeed.email);

  if (hasDemoUser) {
    return users;
  }

  const seededUsers = [demoUserSeed, ...users];
  saveUsers(seededUsers);
  return seededUsers;
};

const generateUserId = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

export const registerDemoUser = (
  credentials: SignUpCredentials
): DemoUser => {
  const users = getStoredUsers();
  const existingUser = users.find(
    (user) => user.email.toLowerCase() === credentials.email.toLowerCase()
  );

  if (existingUser) {
    throw new Error("This email is already registered.");
  }

  const newUser: DemoUser = {
    id: generateUserId(),
    fullName: credentials.fullName,
    email: credentials.email,
    password: credentials.password,
    purchasedItems: [],
  };

  const updatedUsers = [...users, newUser];
  saveUsers(updatedUsers);

  return newUser;
};

export const loginDemoUser = ({
  email,
  password,
}: AuthCredentials): Omit<DemoUser, "password"> => {
  const users = getStoredUsers();
  const existingUser = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (!existingUser || existingUser.password !== password) {
    throw new Error("Invalid email or password");
  }

  return {
    id: existingUser.id,
    email: existingUser.email,
    fullName: existingUser.fullName,
    purchasedItems: existingUser.purchasedItems,
  };
};

export const getPurchasedItemsByUser = (userId: string): Course[] => {
  if (!userId) return [];

  const users = getStoredUsers();
  const user = users.find((item) => item.id === userId);

  return user?.purchasedItems || [];
};

export const savePurchasedItemsForUser = (
  userId: string,
  cartItems: Course[]
): Course[] => {
  if (!userId) {
    throw new Error("Missing user id.");
  }

  const users = getStoredUsers();
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    throw new Error("User not found.");
  }

  const currentPurchasedItems = users[userIndex].purchasedItems || [];
  const newItems = cartItems.filter(
    (cartItem) =>
      !currentPurchasedItems.some((existingItem) => existingItem.id === cartItem.id)
  );

  const updatedPurchasedItems = [...currentPurchasedItems, ...newItems];
  const updatedUser = {
    ...users[userIndex],
    purchasedItems: updatedPurchasedItems,
  };

  const updatedUsers = [...users];
  updatedUsers[userIndex] = updatedUser;
  saveUsers(updatedUsers);

  const currentUser = localStorage.getItem(CURRENT_USER_STORAGE_KEY);
  if (currentUser) {
    try {
      const parsedUser = JSON.parse(currentUser);
      if (parsedUser?.id === userId) {
        localStorage.setItem(
          CURRENT_USER_STORAGE_KEY,
          JSON.stringify({ ...parsedUser, purchasedItems: updatedPurchasedItems })
        );
      }
    } catch {
      // Ignore malformed local storage data and keep the users store as source of truth.
    }
  }

  return updatedPurchasedItems;
};
