
import pandas as pd
import pickle
import os
import sys
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import logging

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

def load_training_data():
    """Load the training data from CSV file"""
    data_paths = [
        '../Training_Essay_Data.csv',  # Relative to ml_service directory
        'Training_Essay_Data.csv',     # In current directory
        os.path.join('..', 'Training_Essay_Data.csv')  # Alternative path
    ]
    
    for path in data_paths:
        if os.path.exists(path):
            logger.info(f"Loading training data from: {path}")
            try:
                df = pd.read_csv(path)
                logger.info(f"Loaded {len(df)} samples")
                logger.info(f"Columns: {list(df.columns)}")
                
                # Check data distribution
                if 'generated' in df.columns:
                    value_counts = df['generated'].value_counts()
                    logger.info(f"Data distribution: {dict(value_counts)}")
                    logger.info(f"Human-written (0): {value_counts.get(0, 0)}")
                    logger.info(f"AI-generated (1): {value_counts.get(1, 0)}")
                
                return df
            except Exception as e:
                logger.error(f"Error loading data from {path}: {str(e)}")
                continue
    
    raise FileNotFoundError("Training data file not found. Please ensure Training_Essay_Data.csv is available.")

def train_model(df):
    """Train the AI detection model"""
    logger.info("Starting model training...")
    
    # Prepare the data
    X = df['text']
    y = df['generated']
    
    # Split the data
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.35, random_state=42, stratify=y
    )
    
    logger.info(f"Training set size: {len(X_train)}")
    logger.info(f"Test set size: {len(X_test)}")
    
    # Create the pipeline (same as in the notebook)
    model = Pipeline([
        ('vectorizer', CountVectorizer()),
        ('nb', MultinomialNB())
    ])
    
    # Train the model
    logger.info("Training the model...")
    model.fit(X_train, y_train)
    
    # Evaluate the model
    logger.info("Evaluating the model...")
    y_pred = model.predict(X_test)
    accuracy = accuracy_score(y_test, y_pred)
    
    logger.info(f"Model accuracy: {accuracy:.4f}")
    
    # Detailed evaluation
    logger.info("\nClassification Report:")
    logger.info(classification_report(y_test, y_pred, target_names=['Human', 'AI Generated']))
    
    logger.info("\nConfusion Matrix:")
    cm = confusion_matrix(y_test, y_pred)
    logger.info(f"True Negatives (Human correctly identified): {cm[0][0]}")
    logger.info(f"False Positives (Human misclassified as AI): {cm[0][1]}")
    logger.info(f"False Negatives (AI misclassified as Human): {cm[1][0]}")
    logger.info(f"True Positives (AI correctly identified): {cm[1][1]}")
    
    return model, accuracy

def save_model(model, accuracy):
    """Save the trained model to disk"""
    model_path = 'ai_detection_model.pkl'
    
    try:
        with open(model_path, 'wb') as f:
            pickle.dump(model, f)
        
        logger.info(f"Model saved to: {model_path}")
        
        # Save model metadata
        metadata = {
            'accuracy': accuracy,
            'model_type': 'Naive Bayes with Count Vectorizer',
            'features': 'Text content analysis',
            'version': '1.0.0'
        }
        
        with open('model_metadata.pkl', 'wb') as f:
            pickle.dump(metadata, f)
        
        logger.info("Model metadata saved")
        
    except Exception as e:
        logger.error(f"Error saving model: {str(e)}")
        raise

def test_model(model):
    """Test the model with sample texts"""
    logger.info("Testing model with sample texts...")
    
    # Sample texts for testing
    test_texts = [
        "This is a simple human-written sentence about everyday life.",
        "Furthermore, the implementation of advanced methodologies facilitates the optimization of systematic processes, thereby enhancing overall operational efficiency through comprehensive analytical frameworks.",
        "I went to the store yesterday and bought some groceries. It was a nice day.",
        "The utilization of artificial intelligence technologies demonstrates significant potential for transforming various industrial sectors through innovative computational approaches."
    ]
    
    expected_labels = ["Human", "AI", "Human", "AI"]
    
    for i, text in enumerate(test_texts):
        prediction = model.predict([text])[0]
        probabilities = model.predict_proba([text])[0]
        confidence = max(probabilities)
        
        predicted_label = "AI Generated" if prediction == 1 else "Human"
        
        logger.info(f"\nTest {i+1}:")
        logger.info(f"Text: {text[:100]}...")
        logger.info(f"Expected: {expected_labels[i]}")
        logger.info(f"Predicted: {predicted_label}")
        logger.info(f"Confidence: {confidence:.3f}")
        logger.info(f"Probabilities: Human={probabilities[0]:.3f}, AI={probabilities[1]:.3f}")

def main():
    """Main function to train and save the model"""
    try:
        logger.info("Starting AI Detection Model Training")
        logger.info("=" * 50)
        
        # Load training data
        df = load_training_data()
        
        # Train the model
        model, accuracy = train_model(df)
        
        # Save the model
        save_model(model, accuracy)
        
        # Test the model
        test_model(model)
        
        logger.info("=" * 50)
        logger.info("Model training completed successfully!")
        logger.info(f"Final accuracy: {accuracy:.4f}")
        logger.info("Model is ready for use in the Flask service.")
        
    except Exception as e:
        logger.error(f"Training failed: {str(e)}")
        sys.exit(1)

if __name__ == '__main__':
    main()