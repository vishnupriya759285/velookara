import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'No authentication token, access denied' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔑 Decoded JWT:', decoded);
    
    // Find user by ID (PostgreSQL version)
    const user = await User.findById(decoded.userId);
    console.log('👤 Found user:', user ? `${user.name} (${user.id})` : 'null');
    
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'User not found' 
      });
    }

    // Attach user to request (PostgreSQL returns rows without password already)
    req.user = user;
    console.log('✅ User attached to request:', {
      id: req.user.id,
      name: req.user.name,
      role: req.user.role
    });
    next();
  } catch (error) {
    console.error('❌ Auth error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        success: false,
        message: 'Invalid token' 
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Token expired' 
      });
    }
    res.status(500).json({ 
      success: false,
      message: 'Authentication error', 
      error: error.message 
    });
  }
};

// Flexible role authorization - accepts multiple roles
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: `Access denied. Required role(s): ${roles.join(', ')}` 
      });
    }
    next();
  };
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false,
      message: 'Access denied. Admin privileges required.' 
    });
  }
  next();
};

export const authorizeCitizen = (req, res, next) => {
  if (req.user.role !== 'citizen' && req.user.role !== 'admin') {
    return res.status(403).json({ 
      success: false,
      message: 'Access denied. Citizen privileges required.' 
    });
  }
  next();
};
