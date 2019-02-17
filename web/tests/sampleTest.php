<?php
    declare(strict_types=1);

    use PHPUnit\Framework\TestCase;

    final class sampleTest extends TestCase
    {
        public function testIsEqual(): void
        {
            $this->assertEquals(
                'hello world',
                'hello ' . 'world'
            );
        }
    }

?>