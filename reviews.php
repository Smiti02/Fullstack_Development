<?php
include 'config.php';
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

if (isset($_POST['submit_review'])) {
    $username = $_SESSION['username'];
    $review = $_POST['review'];

    $sql = "INSERT INTO reviews (username, review) VALUES ('$username', '$review')";
    if ($conn->query($sql) === TRUE) {
        $message = "Review submitted!";
    } else {
        $message = "Error: " . $sql . "<br>" . $conn->error;
    }
}

$reviews = $conn->query("SELECT * FROM reviews ORDER BY id DESC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>User Reviews</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1 class="mb-4">User Reviews</h1>
        <?php if (isset($message)): ?>
            <div class="alert alert-info"><?php echo $message; ?></div>
        <?php endif; ?>
        <form action="reviews.php" method="post" class="mb-4">
            <div class="form-group">
                <textarea name="review" class="form-control" rows="3" placeholder="Write your review..." required></textarea>
            </div>
            <button type="submit" name="submit_review" class="btn btn-primary">Submit Review</button>
        </form>
        <h2>All Reviews</h2>
        <?php while ($row = $reviews->fetch_assoc()): ?>
            <div class="card mb-3">
                <div class="card-body">
                    <p class="card-text"><strong><?php echo htmlspecialchars($row['username']); ?>:</strong> <?php echo htmlspecialchars($row['review']); ?></p>
                </div>
            </div>
        <?php endwhile; ?>
    </div>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>
