import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CodeSamples, CodeSample } from "./CodeSamples";

const sampleData: CodeSample[] = [
  { language: "js", label: "JavaScript", code: 'console.log("hello");' },
  { language: "py", label: "Python", code: 'print("hello")' },
  { language: "rb", label: "Ruby", code: 'puts "hello"' },
];

describe("CodeSamples", () => {
  it("returns null for empty samples array", () => {
    const { container } = render(<CodeSamples samples={[]} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders the data-testid='code-samples' container", () => {
    render(<CodeSamples samples={sampleData} />);
    expect(screen.getByTestId("code-samples")).toBeInTheDocument();
  });

  it("renders all sample labels as buttons", () => {
    render(<CodeSamples samples={sampleData} />);
    expect(screen.getByRole("button", { name: "JavaScript" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Python" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ruby" })).toBeInTheDocument();
  });

  it("shows first sample's code by default", () => {
    render(<CodeSamples samples={sampleData} />);
    expect(screen.getByText('console.log("hello");')).toBeInTheDocument();
  });

  it("clicking a tab switches displayed code", () => {
    render(<CodeSamples samples={sampleData} />);
    // Initially shows JavaScript code
    expect(screen.getByText('console.log("hello");')).toBeInTheDocument();

    // Click Python tab
    fireEvent.click(screen.getByRole("button", { name: "Python" }));
    expect(screen.getByText('print("hello")')).toBeInTheDocument();

    // Click Ruby tab
    fireEvent.click(screen.getByRole("button", { name: "Ruby" }));
    expect(screen.getByText('puts "hello"')).toBeInTheDocument();

    // Click back to JavaScript
    fireEvent.click(screen.getByRole("button", { name: "JavaScript" }));
    expect(screen.getByText('console.log("hello");')).toBeInTheDocument();
  });

  it("single sample renders correctly", () => {
    const single: CodeSample[] = [
      { language: "go", label: "Go", code: 'fmt.Println("hello")' },
    ];
    render(<CodeSamples samples={single} />);
    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
    expect(screen.getByText('fmt.Println("hello")')).toBeInTheDocument();
  });

  it("active tab has distinct styling compared to inactive tabs", () => {
    render(<CodeSamples samples={sampleData} />);
    const jsButton = screen.getByRole("button", { name: "JavaScript" });
    const pyButton = screen.getByRole("button", { name: "Python" });

    // First tab is active by default — check border-bottom indicates active
    expect(jsButton.style.borderBottom).toBe("2px solid var(--ac)");
    expect(pyButton.style.borderBottom).toBe("2px solid transparent");

    // After clicking Python, styles swap
    fireEvent.click(pyButton);
    expect(pyButton.style.borderBottom).toBe("2px solid var(--ac)");
    expect(jsButton.style.borderBottom).toBe("2px solid transparent");
  });
});
