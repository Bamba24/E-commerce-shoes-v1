export type Produit = {
  id: string;
  slug: string;
  nom: string;
  description: string;
  prix: number;
  ancienPrix: number;
  remise: number;
  genre: string;
  categorie: string;
  marque: string;
  pointuresDisponibles: string; // CSV : "38,39,40"
  couleursDisponibles: string; // CSV : "Noir,Blanc"
  images: string;              // CSV : "img1.jpg,img2.jpg"
  stock: number;
  note: number;
  nombreAvis: number;
  quantity: number; // ✅ Optionnel ici (utile pour le panier)
};

export type ProduitCommande = {
  id: string;
  nom: string;
  prix: number;
  quantity: number;
};


export type FormValuesAjoutProduit = {
  nom: string;
  slug: string;
  description: string;
  prix: string;
  ancienPrix: string;
  remise: string;
  genre: string;
  categorie: string;
  marque: string;
  pointuresDisponibles: string;
  couleursDisponibles: string;
  stock: string;
  note: string;
  nombreAvis: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
};


export type Props = {
  params: {
    slug: string;
  }
};

export type Utilisateur = {
  id: string;
  nom: string;
  email: string;
  role: string;
  dateInscription: string;
};


export type LoginFormValues = {
  email: string;
  password: string;
};

export type Notification = {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  userId: string;
};

 export type FormValuesProfil = {
  nom: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
};

export type RegisterFormValues = {
  nom: string;
  email: string;
  password: string;
};


export type FormValues = {
  adresseLivraison: string;
  ville: string;
  pays: string;
  codePostal: string;
};

export type JwtPayload = {
  nom: string;
  id: string;
  email: string;
  role: string;
};

export type formValuesContact = {
  name: string,
  email: string,
  phone: number,
  message: string
}

export type Commande = {
  id: string;
  nomUtilisateur: string;
  email: string;
  produit: string;
  quantite: number;
  total: number;
  lieuLivraison: string;
  date: string;
};
