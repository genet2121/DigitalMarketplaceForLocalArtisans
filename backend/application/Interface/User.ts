export default interface User {
    id: number;
    fullName: string;
    email: string;
    phone?: string;
    password: string;
    userRole: 'artisan' | 'customer' | 'admin'; 
    address?: string; 
    createdAt: Date;
    updatedAt: Date;
}
